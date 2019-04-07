const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

function writeUserData(email, password, uid) {

    database.ref("users/" + uid).set({
        name: nameInput.value,
        surname: lastNameInput.value,
        phone: phoneInput.value,
        email: email,
        pass: password
    });     
}

function time() {
	let today = new Date();
	let hour = today.getHours();
	let min = today.getMinutes();
	let day = today.getDay();
	let month = today.getMonth();
	let year = today.getFullYear();
	let timeNow = leftZeros(hour) + ":" + leftZeros(min) + " - " + leftZeros(day) + "/" + leftZeros(month) + "/" + year;

	return timeNow;
}

function leftZeros(number) {
	if (number < 10) {
		newNumber = '0' + number
		return newNumber
	} else {
		return number
	}
}

function appendData(childData, childKey, amountLikes, liked) {
	$(".post-list").append(
		`
		<li>
			<div class=" container-fluid col-md-6 bg-light rounded p-4 my-3">
				<div class="d-flex">
					<!-- <img src=""> -->
					<a class="d-inline-flex mr-auto mb-3">
						<i class="fas fa-user-circle fa-2x purple align-self-center"></i>
						<div class="ml-2">
							<span class="purple">
								<strong class="f-14">Nome</strong>
								<br>
								<span class="small">${childData.postTime}</span>
							</span>
						</div>
					</a>
					<a href="#"> <i class="edit far fa-edit bluish f-14 mx-1"></i> </a>
					<a href="#" class="trash-ic" data-toggle="modal" data-target="#deleteModal" data-post-id="${childKey}"> <i class="delete far fa-trash-alt bluish f-14 mx-1"></i> </a>
				</div>
				<div id="comment-review">
					<h5 class="text-muted" >${childData.label}</h5>
					<p  class="text-muted" >${childData.review}</p>
				</div>
				<div class="d-flex purple">
					<div class="mr-auto">nota estrelas</div>
					<span><strong>${childData.alcohoolPer}%</strong> icone</span>
				</div>
				<div class="text-right">
				 <a href="#" id="like-Unlike" class="mr-auto text-muted" data-post-id="${childKey}"><i class="${liked ? 'fas fa-heart': 'far fa-heart'}"></i></a> <span class="likes" data-post-id="${childKey}">${amountLikes}</span> like(s)
					
				</div>
			</div>
		</li>
	`);
}

$(document).ready(function(){
	ratingStar()
	gettingDrinks()
	
    database.ref("/post/" + USER_ID).once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let childkey = childSnapshot.key;
			let childData = childSnapshot.val();
			let amountLikes = childData.likes ? childData.likes.length : 0;
			let liked = false;

			if (childData.likes) {
				if($.inArray(USER_ID, childData.likes) != -1){
					liked = true;
				}
			}
            appendData(childData, childkey, amountLikes, liked);
		});	
	});
	
	// Funcão que adiciona erro no campo se vazio
	$('#container-comment input[type="text"], input[type="number"], textarea').on('keyup', function() {
		if($(this).val() === ''){
			$(this).addClass('is-invalid');
		}
		else{
			$(this).removeClass('is-invalid');
		}
	});

	// Função que posta os dados se todos estiverem preenchidos
    $(".add-post").click(function(event) {
		event.preventDefault();

		// Valida de todos os campos estão preenchidos
		let error = false
		$('#container-comment input[type="text"], input[type="number"], textarea').each(function(){
			if($(this).val() === ''){
				$(this).addClass('is-invalid');
				error = true
			}
			else{
				$(this).removeClass('is-invalid');
			}
		}) 
		if (error) return false
		
		let data = {
			drinkIcon: iconDrink(parseInt($('#listDrinks li.selected').last().data('value'), 10)),
			label: $("#label").val().toUpperCase(),
			review: $("#comment").val(),
			alcohoolPer: $("#alcohol").val(),
			postTime: time(),
			starScore: typeof($('#stars li.selected').last().data('value')) === 'undefined' ? 0 : $('#stars li.selected').last().data('value'),
		};
		
        let postFromDb = database.ref("/post/" + USER_ID).push(data);
		appendData(data, postFromDb.key, 0, false);
		$('#container-comment')[0].reset();
		$('#stars li').removeClass('selected');
	});

	let selected_key = ''
	$(document).on('click', '.trash-ic', function() {
		selected_key = $(this).attr('data-post-id');
	})

	//1guarda o like que foi clicado e muda a cor. ok
	//2 passos a frente: pegar o id de qm está clicando e onde foi clicado. 
	//3 passo, antes de add validar se o cara já clicou
	//4 passo, se o cara que clicou tem

	$(document).on('click', '#like-Unlike', function(e) {
		e.preventDefault();

		selected_key = $(this).attr('data-post-id');

		if ($(this.firstChild).attr('class') === 'fas fa-heart') {
			$(this.firstChild).removeClass('fas fa-heart');
			$(this.firstChild).addClass('far fa-heart');
		}
		else {
			$(this.firstChild).removeClass('far fa-heart');
			$(this.firstChild).addClass('fas fa-heart');
		}
		
		database.ref("/post/" + USER_ID + '/' + selected_key).once("value")
		.then(function(snapshot) {
			let values = snapshot.val();
			
			if (values.likes) {
				if($.inArray(USER_ID, values.likes) != -1){
					values.likes.splice($.inArray(USER_ID, values.likes),1);
				}
				else{
					values.likes.push(USER_ID);
				}
			}
			else {
				values.likes = [];
				values.likes.push(USER_ID);
			}
			$(`span[data-post-id=${selected_key}]`).html(values.likes.length);
			database.ref("/post/" + USER_ID + '/'+ selected_key).update(values);
			
		});
	});

	$("#btnDelete").click(function(){
		database.ref("post/" + USER_ID + "/" + selected_key).remove();
		$(`a[data-post-id=${selected_key}]`).closest("li").remove();
		$('#deleteModal').modal('hide');
	});

	
});

