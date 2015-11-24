module.exports = function() {
    var config = {
        mkdir: function(dest, src) {
            $.fs.stat(dest, function(err, stats) {
                if (!stats.isDirectory()) {
                    gulp.src(src + '**/*')
                        .pipe(gulp.dest(dest));
                } else if (!err) {
                    $.fs.readdir(dest, function(er, files) {
                        var hash = {},
                            needFiles = [];
                        files.forEach(function(file, i) {
                            hash[file] = true;
                        })
                        $.fs.readdir(src, function(e, orgFiles) {
                            orgFiles.forEach(function(file, i) {
                                if (!hash[file]) {
                                    gulp.src(src + file + '/')
                                        .pipe(gulp.dest(dest));
                                }
                            })
                        })
                    })
                };
            })
        }
    };
    return config;
};