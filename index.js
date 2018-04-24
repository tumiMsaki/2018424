window.onload = function() {
    document.getElementById('uploadFile').onchange = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(ev) {
            img_src = ev.target.result;
            var imgs = document.getElementsByClassName('img');
            imgs[0].setAttribute('src', img_src);
        }
    };
    document.getElementById('btn').onclick = function() {
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
            success: function() {
                alert('1');

                function progressFunction(evt) {
                    var progressBar = document.getElementById("progressBar");
                    var percentageDiv = document.getElementById("percentage");
                    if (evt.lengthComputable) {
                        progressBar.max = evt.total;
                        progressBar.value = evt.loaded;
                        percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
                    }
                }
                progressFunction();
            }
        })
    }
}