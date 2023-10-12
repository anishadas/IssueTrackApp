{
    //notification
    let createNoty = function (type, msg) {
        new Noty({
            theme: 'bootstrap-v4',
            type,
            text: msg,
            timeout: 1000,
        }).show();
    }

    //create a new issue
    let createIssue = function () {
        let newIssueForm = $("#new-issue");
        newIssueForm.submit(e => {
            e.preventDefault();
            // console.log(newIssueForm);
            $('#modal2').modal('hide');
            $.ajax({
                type: 'post',
                url: '/project/issue/create',
                data: newIssueForm.serialize(),
                success: (data) => {
                    let newIssue = newIssueDom(data.data.issues);
                    createNoty('success', data.msg);
                    $('#all-issues-list').prepend(newIssue);
                    deleteIssue($('.delete-icon', newIssue));
                    $('#title').val('');
                    $('#author').val('');
                    $('#descriptionIssue').val('');
                    $('#myModal').modal('hide');
                }, error: (error) => {
                    createNoty('error', data.msg);
                    console.log(error.responseText);
                }
            })
        })
    }

    //add issue to dom
    let newIssueDom = function (issue) {
        let labelStr = "";
        for (let label of issue.labels) {
            labelStr += `
                    <p>${label}</p>
                    `
        }
        return $(`
        <li id="issue-${issue._id}">
                <div class="issue-icon">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/8812/8812098.png" />
                </div>
                <div class="issues-container-list">
                    <div class="issue-details">
                        <div class="details">
                            <p>Title: ${issue.title}</p>
                            <p>Author: ${issue.author}</p>
                            <p>Issue Description: ${issue.issueDescription}</p>
                        </div>
                        <div class="delete-icon" data="/project/issue/delete/${issue._id}">
                            <img src="https://cdn-icons-png.flaticon.com/128/3221/3221897.png" />
                        </div>
                    </div>

                    <div class="issue-labels">
                        ${labelStr}
                    </div>
                </div>

            </li>
        `)
    }
    createIssue();


    //delete issue
    let deleteIssue = function (delLink) {

        $(delLink).click((e) => {
            e.preventDefault();
            // console.log(delLink.href);
            $.ajax({
                type: 'get',
                url: $(delLink).attr('data'),
                success: (data) => {
                    createNoty('success', data.msg);
                    $(`#issue-${data.data.issue_id}`).remove();
                }, error: (error) => {
                    createNoty('error', data.msg);
                    console.log(error.responseText);
                }
            })
        })

    }

    let del_issue = document.querySelectorAll(".delete-icon");
    // console.log(del);
    del_issue.forEach(btn => {
        deleteIssue(btn)
    })


   //search for a issue & add it to dom
    let searchIssue = function () {
        let searchForm = document.getElementById("search");
        let issue_data = JSON.parse(document.getElementById("issue-data").getAttribute('data'));
        let displayList = document.getElementById('all-issues-list');

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let searched = [];
            let searchTerm = searchForm.querySelector('input[name="search"]').value;
            
            issue_data.map(issueEl => {
                if (issueEl.title == searchTerm.toLowerCase() || issueEl.issueDescription== searchTerm.toLowerCase() || issueEl.title == searchTerm || issueEl.issueDescription == searchTerm) {
                    if (!searched.includes(issueEl)) {
                        createNoty('success', "Search Found!");
                        searched.push(issueEl);
                    }
                }
            });

            if (searched.length == 0) {
                createNoty('success', "No such issue exists");
            }
            displayList.innerHTML = "";
            let str = "";

            for (let issue of searched) {
                let labelStr = "";
                for (let label of issue.labels) {
                    labelStr += `
                        <p>${label}</p>
                    `
                }
                str += `
                <li>
                <div class="issue-icon">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/8812/8812098.png" />
                </div>
                <div class="issues-container-list">
                    <div class="issue-details">
                        <div class="details">
                            <p>Title: ${issue.title}</p>
                            <p>Author: ${issue.author}</p>
                            <p>Issue Description: ${issue.issueDescription}</p>
                        </div>
                        <button class="delete-icon" >
                            <img src="https://cdn-icons-png.flaticon.com/128/3221/3221897.png" />
                        </button>
                    </div>
                    <div class="issue-labels">
                       ${labelStr}
                    </div>
                </div>

            </li>
                `
            }
            displayList.innerHTML = str;
        })
    }
    searchIssue();

    //filter isses
    let filterIssues = function () {
        let filterForm = document.getElementById("filter-container");
        let issue_data = JSON.parse(document.getElementById("issue-data").getAttribute('data'));
        // console.log(issue_data)
        let displayList = document.getElementById('all-issues-list');
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            $('#modal3').modal('hide');
            let filtered = [];
            let labelsList = filterForm.querySelectorAll('input[type=checkbox]');
            let labelsEl = [...labelsList].filter((el) => el.checked);
            // console.log(labelsEl)
            let author = filterForm.querySelector(
                'input[type=radio][name=author]:checked'
            );

            // console.log(author)
            let [...labels] = labelsEl.map((el) => el.value);

            issue_data.map(issueEl => {
                // console.log(issueEl.author,author,issueEl.author==author)
                if (author && issueEl.author.value.toLowerCase() == author) {
                    if (!filtered.includes(issueEl)) {
                        filtered.push(issueEl);
                    }
                }

                console.log(labels,issueEl)
                labels.map((label) => {
                    if (issueEl.labels.includes(label)) {
                        if (!filtered.includes(issueEl)) {
                            filtered.push(issueEl);
                        }
                    }
                });

            });
            console.log("hi",filtered)
            if (filtered.length == 0) {
                createNoty('success', "No such issue exists");
            } else {
                createNoty('success', "Issue Found!");
            }

            displayList.innerHTML = "";
            let str = "";

            for (let issue of filtered) {
                let labelStr = "";
                console.log(issue.labels);
                for (let label of issue.labels) {
                    labelStr += `
                        <p>${label}</p>
                    `
                }
                console.log(labelStr)
                str += `
                <li>
                <div class="issue-icon">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/8812/8812098.png" />
                </div>
                <div class="issues-container-list">
                    <div class="issue-details">
                        <div class="details">
                            <p>Title: ${issue.title}</p>
                            <p>Author: ${issue.author}</p>
                            <p>Issue Description: ${issue.issueDescription}</p>
                        </div>
                        <button class="delete-icon">
                            <img src="https://cdn-icons-png.flaticon.com/128/3221/3221897.png" />
                        </button>
                    </div>
                    <div class="issue-labels">
                       ${labelStr}
                    </div>
                </div>

            </li>
                `
            }
            displayList.innerHTML = str;
        })
    }
    filterIssues();
}