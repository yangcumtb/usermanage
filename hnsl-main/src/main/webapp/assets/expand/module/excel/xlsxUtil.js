

/**
 * 初始化 Handson Table 的封装
 *
 *
 * @author fengshuonan
 */

layui.define([], function (exports) {

    var xlsxUtil = {};
    xlsxUtil.Binary = {
        fixdata(data) {
            var o = "",
                l = 0,
                w = 10240;
            for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        },
        s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for(var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    }
    xlsxUtil.XLSX = {
        wb: null,
        rABS: false,
        import(f, c) {
            if(f == undefined){
                return;
            }
            this.wb = null;
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                if(xlsxUtil.XLSX.rABS) {
                    xlsxUtil.XLSX.wb = XLSX.read(btoa(xlsxUtil.Binary.fixdata(data)), {
                        type: 'base64'
                    });
                } else {
                    xlsxUtil.XLSX.wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }
                if(c && typeof(c)) {
                    c();
                }
            };
            if(xlsxUtil.XLSX.rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },
        onImport(obj, c) {
            if(!obj.files) {
                return;
            }
            this.import(obj.files[0], c);
        },
        getSheetsByIndex(index = 0) {
            return XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[index]]);
        },
        getCharCol(n) {
            let temCol = '',
                s = '',
                m = 0
            while(n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        },
        export(json, title, type) {
            var keyMap = [];
            for(k in json[0]) {
                keyMap.push(k);
            }
            var tmpdata = [];
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? xlsxUtil.XLSX.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                v: v.v
            });
            var outputPos = Object.keys(tmpdata);
            var tmpWB = new Object();
            title = title ? title : "mySheet";
            tmpWB.SheetNames = [title];
            tmpWB.Sheets = {};
            tmpWB.Sheets[title] = Object.assign({}, tmpdata, {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1]
            });
            return new Blob([xlsxUtil.Binary.s2ab(XLSX.write(tmpWB, {
                bookType: (type == undefined ? 'xlsx' : type),
                bookSST: false,
                type: 'binary'
            }))], {
                type: ""
            });
        },
        onExport(json, title, type) {
            xlsxUtil.Download.byObj(this.export(json, title, type), "下载.xlsx");
        }
    };
    xlsxUtil.Download = {
        byURL(url, fileName) {
            var tmpa = document.createElement("a");
            tmpa.download = fileName || "下载";
            tmpa.href = url;
            tmpa.click();
        },
        byObj(obj, fileName) {
            this.byURL(URL.createObjectURL(obj), fileName);
            setTimeout(function() {
                URL.revokeObjectURL(obj);
            }, 100);
        }
    }
    xlsxUtil.Object = {
        reverse(obj) {
            var o = new Object();
            for(var k in obj) {
                o[obj[k]] = k;
            }
            return o;
        },
        deepCopy() {
            let temp = obj.constructor === Array ? [] : {}
            for(let val in obj) {
                temp[val] = typeof obj[val] == 'object' ? deepCopy(obj[val]) : obj[val];
            }
            return temp;
        },
        copyJson(o) {
            return JSON.parse(JSON.stringify(o));
        }
    }

    exports('xlsxUtil', xlsxUtil);

});