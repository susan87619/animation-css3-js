// 4输出所有的海报data
var data = [{
	index: "1",
	img: "1.jpg",
	caption: '标题图片1',
	desc: "描述"
}, {
	index: "2",
	img: "2.jpg",
	caption: '标题图片2',
	desc: "描述"
}, {
	index: "3",
	img: "3.jpg",
	caption: '标题图片3',
	desc: "描述"
}, {
	index: "4",
	img: "4.jpg",
	caption: '标题图片4',
	desc: "描述"
}, {
	index: "5",
	img: "5.jpg",
	caption: '标题图片5',
	desc: "描述"
}, {
	index: "6",
	img: "6.jpg",
	caption: '标题图片6',
	desc: "描述"
}, {
	index: "7",
	img: "7.jpg",
	caption: '标题图片7',
	desc: "描述"
}, {
	index: "8",
	img: "8.jpg",
	caption: '标题图片8',
	desc: "描述"
}, {
	index: "9",
	img: "9.jpg",
	caption: '标题图片9',
	desc: "描述"
}, {
	index: "10",
	img: "10.jpg",
	caption: '标题图片10',
	desc: "描述"
}, {
	index: "11",
	img: "12.jpg",
	caption: '标题图片11',
	desc: "描述"
}, {
	index: "12",
	img: "13.jpg",
	caption: '标题图片12',
	desc: "描述"
}, {
	index: "13",
	img: "14.jpg",
	caption: '标题图片13',
	desc: "描述"
}, ];
// 改变类名，改变旋转度数
function turn(elem) {
	// body...
	var cls = elem.className;
	var n = elem.id.split("_")[1];
	if (!/photo_center/.test(cls)) {
		return rsort(n);
	}
	if (/photo_front/.test(cls)) {
		cls = cls.replace(/photo_front/, 'photo_back');
		g("#nav_" + n).className = 'i i_back ';
	} else {
		cls = cls.replace(/photo_back/, 'photo_front');
		g("#nav_" + n).className = g("#nav_" + n).className.replace(/\s*i_back\s*/, '');
	}

	return elem.className = cls
}
// 通用函数
function g(selector) {
	var method = selector.substr(0, 1) == "." ? "getElementsByClassName" : "getElementById";
	return document[method](selector.substr(1));
}

function addPhotos() {
	var templete = g("#wrap").innerHTML;
	var html = [];
	var nav = [];
	for (s in data) {
		var _html = templete
			.replace('{{index}}', s)
			.replace('{{img}}', data[s].img)
			.replace('{{caption}}', data[s].caption)
			.replace('{{desc}}', data[s].desc);
		html.push(_html);
		nav.push('<span class="i" id="nav_' + s + '" onclick="turn(g(\'#photo_' + s + '\'))">&nbsp;</span>');
	}
	html.push('<div class="nav">' + nav.join('') + '</div>')
	g("#wrap").innerHTML = html.join("");
	rsort(random([0, data.length]));
}
addPhotos()
	// 随机生成一个值支持取值范围 random（[min,max]）
function random(range) {
	var max = Math.max(range[0], range[1]);
	var min = Math.min(range[0], range[1]);
	var diff = max - min; //差值。
	var number = Math.ceil(Math.random() * diff + min);
	return number;
}
// 5排序海报
function rsort(n) {
	var _photo = g(".photo");
	var photos = []
	for (var s = 0; s < _photo.length; s++) {
		_photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/, '');
		_photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/, '');
		_photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/, '');
		_photo[s].style.left = '';
		_photo[s].style.top = '';
		_photo[s].style['-webkit-transform'] = 'rotate(0deg)';
		_photo[s].style['transform'] = 'rotate(0deg)';
		photos.push(_photo[s]);
		_photo[s].className += ' photo_front';
	}
	var photo_center = g("#photo_" + n);
	photo_center.className += " photo_center ";
	photo_center = photos.splice(n, 1)[0]
		// console.log(photos.length);
		// 
		// 把海报分为左右两个部分
	var photos_left = photos.splice(0, Math.ceil(photos.length / 2))
	var photos_right = photos;

	var ranges = range();
	for (s in photos_left) {
		var photo = photos_left[s];
		photo.style.left = random(ranges.left.x) + 'px';
		photo.style.top = random(ranges.left.y) + 'px';

		photo.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg)'
	}
	for (s in photos_right) {
		var photo = photos_right[s];
		photo.style.left = random(ranges.right.x) + 'px';
		photo.style.top = random(ranges.right.y) + 'px';

		photo.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg)'
	}
	// 控制按钮处理
	var navs = g('.i');
	for (var s = 0; s < navs.length; s++) {
		navs[s].className = navs[s].className.replace(/\s*i_current\s*/, '');
		navs[s].className = navs[s].className.replace(/\s*i_back\s*/, '');
	}
	g("#nav_" + n).className += " i_current ";
}

// 6计算左右分区的范围{left:{x:[min,max],y:[]},right:{x:[min,max],y:[]}
function range() {
	var range = {
		left: {
			x: [],
			y: []
		},
		right: {
			x: [],
			y: []
		}
	};
	var wrap = {
		w: g("#wrap").clientWidth,
		h: g("#wrap").clientHeight
	}
	var photo = {
		w: g(".photo")[0].clientWidth,
		h: g(".photo")[0].clientHeight
	}
	range.wrap = wrap;
	range.photo = photo;
	range.left.x = [0 - photo.w, wrap.w / 2 - photo.w / 2];
	range.left.y = [0 - photo.h, wrap.h];
	range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w];
	range.right.y = range.left.y;
	return range
}