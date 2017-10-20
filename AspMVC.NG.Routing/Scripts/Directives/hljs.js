var hljs = function ($timeout) {
    return {
        link: function (scope, element) {
            $timeout(function () {
                hljs.highlightBlock(element[0].querySelector('code'));
            }, 100);
        }
    };
};

hljs.$inject = ['$timeout'];