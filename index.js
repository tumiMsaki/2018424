window.onload = function() {
    document.querySelector('#uploadFile').addEventListener("change", function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(ev) {
            img_src = ev.target.result;
            var imgs = document.querySelectorAll('.img');
            imgs[0].setAttribute('src', img_src);
        }
    })

    document.querySelector('#btn').onclick = function() {
        $.ajax({
            url: "http://127.0.0.1:8888/upload",
            type: "POST",
            async: true,
            data: new FormData($('#form')[0]),
            processData: false,
            contentType: false,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error message : " + errorThrown.toString())
            },
            xhr: function() { //用以显示上传进度  
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = Math.floor(event.loaded / event.total * 100);
                        document.querySelector("#progress .progress-item").style.width = percent + "%";
                    }, false);
                }
                return xhr
            },
            success: function() {
                alert('1');
            }
        })
    }
}