  /*
    <div class="panel-footer">
        <div class="row">
            <div class="col col-md-12">
                <excel-download datasource="nomineesModel" class="pull-right"></excel-download>
            </div>
        </div>
    </div>

    .directive('excelDownload', function() {

        var controller = ['$scope', function($scope) {

                $scope.items = [];

                function init() {
                    //$scope.items = angular.copy($scope.datasource);
                    angular.forEach($scope.datasource, function(row) {
                        var item = {};
                        item.first = row.first;
                        item.last = row.last;
                        item.title = row.title.name;
                        item.region = row.region.name;
                        item.country = row.country.name;
                        item.recurringWinner = row.recurringWinner;
                        item.winCount = row.winCount.name;
                        item.years = row.years;
                        item.salesQuota = row.performance.salesQuota;
                        item.sales = row.performance.sales;
                        item.percentOver = row.performance.percentOver;
                        item.percentLast = row.performance.percentLast;
                        item.nomStatus = row.nomStatus;
                        $scope.items.push(item);
                    });
                }

                init();

                $scope.fields = {
                    "first": "String",
                    "last": "String",
                    "title": "String",
                    "region": "String",
                    "country": "String",
                    "recurringWinner": "String",
                    "winCount": "Number",
                    "years": "String",
                    "salesQuota": "Number",
                    "sales": "Number",
                    "percentOver": "Number",
                    "percentLast": "Number",
                    "nomStatus": "String"
                };

                $scope.emitXmlHeader = function() {
                    var headerRow = '<ss:Row>\n';
                    for (var colName in $scope.fields) {
                        headerRow += '  <ss:Cell>\n';
                        headerRow += '    <ss:Data ss:Type="String">';
                        headerRow += $scope.fixHeader(colName) + '</ss:Data>\n';
                        headerRow += '  </ss:Cell>\n';
                    }

                    headerRow += '</ss:Row>\n';
                    return '<?xml version="1.0"?>\n' +
                        '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
                        '<ss:Worksheet ss:Name="Sheet1">\n' +
                        '<ss:Table>\n\n' + headerRow;
                };

                $scope.emitXmlFooter = function() {
                    return '\n</ss:Table>\n' +
                        '</ss:Worksheet>\n' +
                        '</ss:Workbook>\n';
                };

                $scope.jsonToSsXml = function() {
                    var col;
                    var xml;

                    xml = $scope.emitXmlHeader();

                    angular.forEach($scope.items, function(row) {

                        xml += '<ss:Row>\n';

                        for (col in row) {
                            xml += '  <ss:Cell>\n';
                            xml += '    <ss:Data ss:Type="' + $scope.fields[col] + '">';
                            xml += row[col] + '</ss:Data>\n';
                            xml += '  </ss:Cell>\n';
                        }

                        xml += '</ss:Row>\n';
                    });

                    xml += $scope.emitXmlFooter();
                    return xml;
                };

                //un camel case string
                $scope.fixHeader = function(str) {
                    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
                        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
                        .replace(/^./, function(str) {
                            return str.toUpperCase()
                        });
                };

                $scope.download = function() {
                    var content = $scope.jsonToSsXml();
                    var a = document.getElementById('dle');
                    var blob = new Blob([content], {
                        'type': 'aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    a.href = window.URL.createObjectURL(blob);
                    a.download = 'nominees.xls';
                };


            }],
            template = '<a class="btn btn-approve" href="" id="dle" ng-click="download()"><i class="fa fa-download pull-left"></i> Download as Excel</a>';

        return {
            restrict: 'EA', //Default in 1.3+
            scope: {
                datasource: '='
            },
            controller: controller,
            template: template
        };
    })
    */