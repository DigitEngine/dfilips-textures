var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var btn = document.getElementById("full");

btn.addEventListener("click", function(){
    cvs.requestFullscreen();
});

var colors = [
0x00, 0x00, 0x00, 0xff,
0xaa, 0x00, 0x00, 0xff,
0x00, 0xaa, 0x00, 0xff,
0xaa, 0xaa, 0x00, 0xff,
0x00, 0x00, 0xaa, 0xff,
0xaa, 0x00, 0xaa, 0xff,
0x00, 0xaa, 0xaa, 0xff,
0xaa, 0xaa, 0xaa, 0xff,
0x44, 0x44, 0x44, 0xff,
0xff, 0x44, 0x44, 0xff,
0x44, 0xff, 0x44, 0xff,
0xff, 0xff, 0x44, 0xff,
0x44, 0x44, 0xff, 0xff,
0xff, 0x44, 0xff, 0xff,
0x44, 0xff, 0xff, 0xff,
0xff, 0xff, 0xff, 0xff];

function getColorFromData(r, g, b)
{
    var col = 0;
    var avg = (r+g+b) / 3;
    if(avg >= 0x44)
    {
        col += 8;
        r -= 0x44;
        g -= 0x44;
        b -= 0x44;
    }

    if(r > 0x80)col += 1;
    if(g > 0x80)col += 2;
    if(b > 0x80)col += 4;

    return col;
}

var vram = new Array(320 * 240);
for(var i = 0; i < 320 * 240; i++)vram[i] = 0;
var floornum = document.getElementsByClassName("floor").length;
//var wallnum = document.getElementsByClassName("wall").length;
//var tpnum = document.getElementsByClassName("transp").length;
//var bgnum = document.getElementsByClassName("backgr").length;

var floors = new Array(4096);
var floor = document.getElementsByClassName("floor")[0];
//floor.setAttribute("crossOrigin", "");
ctx.drawImage(floor, 0, 0);
var cv = ctx.getImageData(0, 0, 64, 64);
ctx.putImageData(cv, 0, 0);

var idata = new ImageData(320, 240);

var time = 0;
function update()
{
    for(var i = 0; i < 76800 * 4; i += 4)
    {
        idata.data[i] = colors[(vram[i / 4] * 4)];
        idata.data[i + 1] = colors[(vram[i / 4] * 4) + 1];
        idata.data[i + 2] = colors[(vram[i / 4] * 4) + 2];
        idata.data[i + 3] = colors[(vram[i / 4] * 4) + 3];
    }
    //ctx.putImageData(idata, 0, 0);
}
update();
setInterval(update, 1000 / 60);
