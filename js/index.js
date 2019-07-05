/*
var SOC = 'CHN';
var points = 4;
//經度
var longitude = new Number(102.77);
//緯度
var latitude = new Number(31.0700);
//照片
var pictures = ['SiguniangMountain.jpg','SiguniangMountain1.jpg','leopard.jpg','panada.jpg'];

//產生min到max之間的亂數
function getRandom(number){
  if (number>100) {
    return Number((Math.random()/10).toFixed(6));
  }
  else {
    return Number((Math.random()/10).toFixed(4));
  }

};
var disCountry = new AMap.DistrictLayer.Country({
    zIndex:10,
    SOC: SOC,
    depth:2,
    styles:{
        'nation-stroke':'yellow',
        'province-stroke':'#858585',
        'coastline-stroke':'yellow',
        'weight':'15',
        'city-stroke': '#858585',//中国特有字段
        'fill':'rgba(255,255,255,0)'
        }
})


var map = new AMap.Map("container",{
        center: [103.802500, 41.322700],
        zoom:4.8,
        showIndoorMap:false,
        isHotspot:false,
        defaultCursor:'pointer',
        touchZoomCenter:1,
        pitch: 0,
        layers:[
            disCountry,
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer.RoadNet()
        ],
        viewMode:'3D',
        resizeEnable: true
})
AMap.plugin('AMap.ToolBar',function(){
           var toolbar = new AMap.ToolBar();
           map.addControl(toolbar)
        })
map.addControl(new AMap.Scale());
//添加marker标记
for (var i = 0; i < points; i++) {
  var marker = new AMap.Marker({
      position: new AMap.LngLat((longitude+getRandom(longitude)),(latitude+getRandom(latitude))),
      offset: new AMap.Pixel(-10, -10),
      icon: 'images/' + pictures[i], // 添加 Icon 图标 URL
  });
  map.add(marker);
}
*/



var cluster, markers = [];

var map = new AMap.Map("container",{
        center: [103.802500, 41.322700],
        zoom:4.8,
        resizeEnable: true,
        showIndoorMap:false,
        isHotspot:false,
        defaultCursor:'pointer',
        touchZoomCenter:1,
        pitch: 0,
        layers:[
            disCountry,
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer.RoadNet()
        ],
        viewMode:'3D',
        resizeEnable: true
})

AMap.plugin('AMap.ToolBar',function(){
           var toolbar = new AMap.ToolBar();
           map.addControl(toolbar)
        })
map.addControl(new AMap.Scale());

for (var i = 0; i < points.length; i += 1) {
    markers.push(new AMap.Marker({
        position: points[i]['lnglat'],
        content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        offset: new AMap.Pixel(-15, -15)
    }))
}

var count = markers.length;
var _renderClusterMarker = function (context) {
    var factor = Math.pow(context.count / count, 1 / 18);
    var div = document.createElement('div');
    var Hue = 180 - factor * 180;
    var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
    var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
    var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
    div.style.backgroundColor = bgColor;
    var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
    div.style.width = div.style.height = size + 'px';
    div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = size / 2 + 'px';
    div.style.boxShadow = '0 0 1px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    div.style.color = fontColor;
    div.style.fontSize = '14px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div)
};

addCluster(2);

function addCluster(tag) {
    if (cluster) {
        cluster.setMap(null);
    }
    if (tag == 2) {//完全自定义
        cluster = new AMap.MarkerClusterer(map, markers, {
            gridSize: 80,
            renderClusterMarker: _renderClusterMarker
        });
    } else if (tag == 1) {//自定义图标
        var sts = [{
            url: "https://a.amap.com/jsapi_demos/static/images/blue.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/green.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/orange.png",
            size: new AMap.Size(36, 36),
            offset: new AMap.Pixel(-18, -18)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/red.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
        }];
        cluster = new AMap.MarkerClusterer(map, markers, {
            styles: sts,
            gridSize: 80
        });
    } else {//默认样式
        cluster = new AMap.MarkerClusterer(map, markers, {gridSize: 80});
    }
}

var disCountry = new AMap.DistrictLayer.Country({
    zIndex:10,
    SOC: SOC,
    depth:2,
    styles:{
        'nation-stroke':'yellow',
        'province-stroke':'#858585',
        'coastline-stroke':'yellow',
        'weight':'15',
        'city-stroke': '#858585',//中国特有字段
        'fill':'rgba(255,255,255,0)'
        }
})
