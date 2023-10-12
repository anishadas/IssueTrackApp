{
    //notifications
    let createNoty = function (type, msg) {
        console.log(type, msg)
        new Noty({
            theme: 'bootstrap-v4',
            type,
            text: msg,
            timeout: 1000,
        }).show();
    }

    //create new project
    let createProject = function () {
        let newProjectForm = $("#new-project");
        newProjectForm.submit((e) => {
            e.preventDefault();
            $('#exampleModal').modal('hide');
            $.ajax({
                type: 'post',
                url: '/project/create',
                data: newProjectForm.serialize(),
                success: (data) => {
                    createNoty('success', data.msg);
                    let newProject = newDomProject(data.data.project);
                    $('#projects-list-container').prepend(newProject);
                    deleteProject($('.del-project-icon', newProject));
                    $('#projectName').val('');
                    $('#author').val('');
                    $('#description').val('');
                }, error: (error) => {
                    createNoty('error', data.msg);
                    console.log(error.responseText);
                }
            })
        })
    }

    //add prject to dom
    let newDomProject = function (project) {
        return $(`
            <li id="project-${project._id}">
                <div class="project-header">

                    <p class="project-name"><span>Name of the project :</span>${project.name}</p>
                    <div class="del-project-icon" data="/project/delete/${project._id}">
                        <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png" />
                    </div>
                </div>

                <div class="details">
                    <div>
                        <p><span>Author :</span>${project.author}</p>
                        <p><span>Description :</span>${project.description}</p>
                    </div>
                    <button>
                        <!-- open project -->
                        <a class="open-project" href="/project/${project._id}">Open
                            Project</a>
                    </button>
                </div>
            </li>
        `)
    }

    //delete a project
    let deleteProject = function (delLink) {
        $(delLink).click((e) => {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(delLink).attr('data'),
                success: (data) => {
                    console.log("del", data)
                    createNoty('success', data.msg);
                    $(`#project-${data.data.project_id}`).remove();
                }, error: (error) => {
                    createNoty('error', data.msg);
                    console.log(error.responseText);
                }
            })
        })
    }

    createProject();



    let del_project = document.querySelectorAll(".del-project-icon");

    del_project.forEach(btn => {
        deleteProject(btn)
    })


}