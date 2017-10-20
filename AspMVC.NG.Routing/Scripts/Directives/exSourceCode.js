var exSourceCode = function () {
    return {
        template: '<h4>{{title}}</h4><pre  hljs class="html"><code>{{sourceCode}}</code></pre>',
        scope: {},
        link: function (scope, element, attrs) {
            var tmp = angular.element((element.parent()[0]).querySelector(attrs.target || 'md-input-container'));
            if (tmp.length) {
                scope.title = attrs.title || "Source Code";
                var sourceCode = tmp[0].outerHTML
                    .replace('ng-model=', 'angularModel=')
                  .replace('ng-click=', 'angularClick=')
                    .replace(/ng-[a-z\-]+/g, '')
                    .replace(/ +/g, ' ')
                    .replace('angularModel=', 'ng-model=')
                    .replace('angularClick=', 'ng-click=')
                ;

                scope.sourceCode = style_html(sourceCode, {
                    'indent_size': 2,
                    'indent_char': ' ',
                    'max_char': 78,
                    'brace_style': 'expand'
                });
            }
        }
    };
};