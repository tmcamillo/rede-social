const database = firebase.database();
let USER_ID = null;
let selected_key = "";

$(document).ready(() => {
    getUserID();
    ratingStar();

    $(".add-post").click((e) => {
        e.preventDefault()
        validateForm()
    })

    $(".post-list").on('click', '.edit-btn', function (e) {
        e.preventDefault()
        editPost($(this).attr("data-edit-id"))
    })

    $(".post-list").on('click', '.save-update', function (e) {
        e.preventDefault()
        saveUpdatedPost($(this).attr("data-btn-id"))
    })

    $(".post-list").on('click', '.edit-btn', function (e) {
        e.preventDefault()
        editPost($(this).attr("data-edit-id"))
    })

    $(".post-list").on("click", ".trash-ic", function () {
        selected_key = $(this).attr("data-post-id");
    });

    $("#btnDelete").on("click", () => {
        deletPost()
    });

    $(".post-list").on("click", ".like-unlike", function (e) {
        e.preventDefault();
        if ($(this).children().attr("class") === "fas fa-heart") {
            $(this).children().removeClass("fas fa-heart");
            $(this).children().addClass("far fa-heart");
        }
        else {
            $(this).children().removeClass("far fa-heart");
            $(this).children().addClass("fas fa-heart");
        }
        selected_key = $(this).attr("data-post-id");
        checkUniqueLike()
    });
});


let getUserID = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            USER_ID = user.uid;
        }
        loadPosts();
    })
}

let printUserName = () => {
    database.ref('users/' + USER_ID).once('value')
        .then(function (snapshot) {
            let userInfo = snapshot.val();
            $(".user-name").text(userInfo.name);
        })
}

let posts = [];
let loadPosts = () => {
    let newPosts = []
    database.ref('/post/' + USER_ID).once('value')
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let amountLikes = childData.likes ? childData.likes.length : 0;
                childData.childKey = childKey;
                childData.amountLikes = amountLikes;
                newPosts.push(childData);
                validateLikes();
            });
            posts = newPosts;
            displayPosts();
            badges();
            printUserName();
        });


}

let displayPosts = () => {
    $(".post-list").empty();
    posts.map((post) => {
        $(".post-list").append(
            `<li>
				<div class='container-fluid col-md-6 bg-light rounded mb-3 p-0'>
					<div class='card-body'>
						<div class='d-flex'>
							<a class='d-inline-flex mr-auto mb-3'>
								<i class='fas fa-user-circle fa-2x purple align-self-center'></i>
								<div class='ml-2'>
									<span class='purple'>
										<span class='f-14 user-name'></span> <span class='badge-user'></span>
										<br>
										<span class='small'>${post.postTime} - ${post.privacy}</span>
									</span>
								</div>
							</a>
							<a href='#' class='edit-btn' data-edit-id='${post.childKey}'> <i class='edit far fa-edit bluish f-14 mx-1'></i> </a>
							<a href='#' class='trash-ic' data-toggle='modal' data-target='#deleteModal'
								data-post-id='${post.childKey}'>
								<i class='delete far fa-trash-alt bluish f-14 mx-1'></i> </a>
						</div>
						<div id='comment-review' class='text-comment'>
							<h5 data-review-id='${post.childKey}'>${post.drinkType} ${post.label}</h5>
							<p class='review m-1' data-review-id='${post.childKey}'>${post.review}</p>
						</div>
						<div class='d-flex purple'>
							<div class='rating text-center my-auto'>
								<ul class='list-unstyled'>
									${post.starReply}
								</ul>
							</div>
							<span class='ml-auto'>Teor alcóolico <strong>${post.alcohoolPer}%</strong></span>
						</div>
					</div>
					<div class='card-footer text-muted'>
						<div class='text-right'>
							<a href='#' class='like-unlike mr-auto text-muted' data-post-id='${post.childKey}'><i
									class='${post.liked ? 'fas fa-heart' : 'far fa-heart'}'></i></a> <span class='likes'
								data-post-id='${post.childKey}'>${post.amountLikes}</span>
						</div>
					</div>
					</div>
				</div>
			</li>
		`);
    })
}

let validateForm = () => {
    let error = false

    if ($('#label').val() === '') {
        $('#label').addClass("is-invalid");
        error = true
    }
    else {
        $('#label').removeClass("is-invalid");
    }

    if ($('#alcohol').val() === '') {
        $('#alcohol').addClass("is-invalid");
        error = true
    }
    else {
        $('#alcohol').removeClass("is-invalid");
    }

    if ($('#comment').val() === '') {
        $('#comment').addClass("is-invalid");
        error = true
    }
    else {
        $('#comment').removeClass("is-invalid");
    }

    if (typeof ($("#stars li.selected").last().data("value")) === "undefined") {
        $('#stars li').addClass("border border-danger");
        error = true
    }
    else {
        $('#stars li').removeClass("border border-danger");
    }

    if (typeof ($("input[class='drink']:checked").val()) === 'undefined') {
        $("#radio-btn-drinks").addClass("border border-danger");
        error = true
    }
    else {
        $("#radio-btn-drinks").removeClass("border border-danger");
    }

    if (!error) saveToDatabase()
}

let saveToDatabase = () => {
    let data = {
        drinkType: $("input[class='drink']:checked").val(),
        label: $("#label").val().toUpperCase(),
        review: $("#comment").val(),
        alcohoolPer: $("#alcohol").val(),
        postTime: timeNdatePosted(),
        starScore: typeof ($("#stars li.selected").last().data("value")) === "undefined" ? 0 : $("#stars li.selected").last().data("value"),
        privacy: $("#selPrivacy option:selected").val(),
        starReply: $("#stars").html(),
    };
    database.ref("/post/" + USER_ID).push(data);

    $(".toast-body").html("Sua review foi adicionada ao feed :)");
    $(".toast").toast("show");

    loadPosts();
    badges();
    resetForm();
}

let editPost = (key) => {
    let post = posts.find((obj) => { return obj.childKey === key })
    console.log(post)
    $(`p[data-review-id='${key}']`).html(`
		<textarea class='post-update form-control rounded bg-light' data-text-id='${key}'>${post.review}</textarea>
		<button class='save-update btn btn-outline-secondary' data-btn-id='${key}'>Salvar</button>
		`);
}

let saveUpdatedPost = (key) => {
    let newPost = $(`textarea[data-text-id='${key}']`).val();
    $(`p[data-review-id='${key}']`).html(newPost);
    database.ref('post/' + USER_ID + '/' + key).update({
        review: newPost
    })
        .then(() => {
            loadPosts();
        })

    $(".post-update").parent().remove();
    $(".save-update").parent().remove();
}

let deletPost = () => {
    database.ref("post/" + USER_ID + "/" + selected_key).remove();
    $(`a[data-post-id=${selected_key}]`).closest("li").remove();
    $("#deleteModal").modal("hide");
    window.scrollTo(0, 0)

    $(".toast-body").html("O post foi deletado do feed :)");
    $(".toast").toast("show");

    loadPosts();
    badges();
}

let resetForm = () => {
    $("#container-comment")[0].reset();
    $("#stars li").removeClass("selected");
};

let timeNdatePosted = () => {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let day = today.getUTCDate();
    let month = today.getUTCMonth();
    let year = today.getUTCFullYear();
    let timeNow = includeZero(day) + '/' + includeZero(month) + '/' + year + ' - ' + includeZero(hour) + ':' + includeZero(min);
    return timeNow;
}

let includeZero = (number) => {
    let newNumber = (number.toString() < 10 ? "0" : "") + number.toString();
    return newNumber;
}

let checkUniqueLike = () => {
    database.ref("/post/" + USER_ID + "/" + selected_key).once("value")
        .then(function (snapshot) {
            let values = snapshot.val();
            if (values.likes) {
                //inArray() search a value in an array and return its index, if the value was not found it’ll return -1.
                if ($.inArray(USER_ID, values.likes) != -1) {
                    //splice(index, howmany, item1, ....., itemX)
                    values.likes.splice($.inArray(USER_ID, values.likes), 1);
                }
                else {
                    values.likes.push(USER_ID);
                }
            }
            else {
                values.likes = [];
                values.likes.push(USER_ID);
            }
            database.ref("/post/" + USER_ID + "/" + selected_key).update(values);
        })
}

let validateLikes = () => {
    let liked = false;
    if (posts.likes) {
        if ($.inArray(USER_ID, posts.likes) != -1) {
            liked = true;
        }
    };
}
