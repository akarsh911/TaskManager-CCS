       function load_chart(repoName)
       {
           var repoOwner = 'ccs-tiet-task'; 
           var apiUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/stats/commit_activity';

           var xhr = new XMLHttpRequest();
           xhr.open('GET', apiUrl);
           xhr.setRequestHeader('Accept', 'application/vnd.github+json');

           xhr.setRequestHeader('X-GitHub-Api-Version', '2022-11-28');
           xhr.onreadystatechange = function () {
               if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                   var response = JSON.parse(xhr.responseText);
                   var data = response.map(function (week) {
                       return week.days.map(function (day) {
                           return day;
                       });
                   });

                   var heatmapContainer = document.querySelector('.heatmap-container');
                   data.forEach(function (week, weekIndex) {
                       week.forEach(function (contributions, dayIndex) {
                           var heatmapBlock = document.createElement('div');
                           heatmapBlock.classList.add('heatmap-block');
                           heatmapBlock.style.backgroundColor = getHeatmapColor(contributions);
                           heatmapBlock.title = getDateString(weekIndex, dayIndex) + ": " + contributions + " contributions"; 
                           heatmapContainer.appendChild(heatmapBlock);
                       });
                   });
               }
           };
           xhr.send();
       }

            function getHeatmapColor(contributions) {
                var color = '#ebedf0'; // Default color for no contributions

                if (contributions > 0 && contributions <= 10) {
                    color = '#9be9a8';
                } else if (contributions > 10 && contributions <= 20) {
                    color = '#40c463';
                } else if (contributions > 20 && contributions <= 30) {
                    color = '#30a14e';
                } else if (contributions > 30 && contributions <= 40) {
                    color = '#216e39';
                } else if (contributions > 40) {
                    color = '#0a532e';
                }

                return color;
            }

            function getDateString(weekIndex, dayIndex) {
                var startDate = new Date();
                startDate.setDate(startDate.getDate() - (52 * 7 - (weekIndex * 7 + dayIndex)));
                var day = startDate.getDate();
                var month = startDate.getMonth() + 1;
                var year = startDate.getFullYear();
                return day + '/' + month + '/' + year;
            }

