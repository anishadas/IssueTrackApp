{
    const filter = () => {
        let filter_container = $('#filter-container');
        filter_container.submit(e => {
            e.preventDefault();
            $("#modal3").modal('hide');
            let issueLabels = $('input[type=checkbox]')
            let selectdlabels=[...issueLabels].filter(el=>el.checked)
            console.log(selectdlabels)
            // $.ajax({
            //     type: 'get',
            //     url: '/project/issue/create',
            //     data: newIssueForm.serialize(),
            //     success: (data) => {
            //         let newIssue = newIssueDom(data.data.issues);
            //         createNoty('success', data.msg);
            //         $('#all-issues-list').prepend(newIssue);
            //         deleteIssue($('.delete-icon', newIssue));
            //         $('#title').val('');
            //         $('#author').val('');
            //         $('#descriptionIssue').val('');
            //         $('#myModal').modal('hide');
            //     }, error: (error) => {
            //         createNoty('error', data.msg);
            //         console.log(error.responseText);
            //     }
            // })
        })
    }

    filter();
}