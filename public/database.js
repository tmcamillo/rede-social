const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

let postFrom = database.ref('/post/' + USER_ID).once('value')
	.then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			console.log('postFrom', childSnapshot);
		});

	});


//função carrega todos os posts já realizados pelo usuário
function loadPosts() {
	database.ref('/post/' + USER_ID).once('value')
		.then(function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				let childkey = childSnapshot.key;
				let childData = childSnapshot.val();
				let amountLikes = childData.likes ? childData.likes.length : 0;
				let liked = false;

				//procura se o post já foi curtido pelo id e se sim, troca o status do liked para já vir preenchido no feed
				if (childData.likes) {
					if ($.inArray(USER_ID, childData.likes) != -1) {
						liked = true;
					}
				}
				appendData(childData, childkey, amountLikes, liked);

			});
		});
	userName()
}

// função salva dados do usuário no firebase
function writeUserData(email, password, uid) {

	database.ref('users/' + uid).set({
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
	let day = today.getUTCDate();
	let month = today.getUTCMonth();
	let year = today.getUTCFullYear();
	let timeNow = leftZeros(day) + '/' + leftZeros(month) + '/' + year + ' - ' + leftZeros(hour) + ':' + leftZeros(min);

	return timeNow;
}

function leftZeros(number) {
	if (number < 10) {
		newNumber = '0' + number;
		return newNumber
	} else {
		return number
	}
}

function userName() {
	database.ref('users/' + USER_ID).once('value')
		.then(function (snapshot) {
			let userInfo = snapshot.val();
			$(".user-name").text(userInfo.name);
		})
}

//Adiciona dinamicamente itens ao html
function appendData(childData, childKey, amountLikes, liked) {
	$(".post-list").append(
		`
		<li>
		<div class='container-fluid col-md-6 bg-light rounded mb-3 p-0'>
			<div class='card-body'>
				<div class='d-flex'>
					<a class='d-inline-flex mr-auto mb-3'>
						<i class='fas fa-user-circle fa-2x purple align-self-center'></i>
						<div class='ml-2'>
							<span class='purple'>
								<strong class='f-14 user-name'></strong>
								<br>
								<span class='small'>${childData.postTime} - ${childData.privacy}</span>
							</span>
						</div>
					</a>
					<a href='#'> <i data-edit-id='${childKey}' class='edit far fa-edit bluish f-14 mx-1'></i> </a>
					<a href='#' class='trash-ic' data-toggle='modal' data-target='#deleteModal'
						data-post-id='${childKey}'>
						<i class='delete far fa-trash-alt bluish f-14 mx-1'></i> </a>
				</div>

				<div id='comment-review' class='text-comment'>
					<h5 data-review-id='${childKey}'>${childData.drinkType} ${childData.label}</h5>
					<p class='review m-1' data-review-id='${childKey}'>${childData.review}</p>

				</div>
				<div class='d-flex purple'>
					<div class='rating text-center my-auto'>
						<ul class='list-unstyled'>
							${childData.starReply}
						</ul>
					</div>
					<span class='ml-auto'>Teor alcóolico <strong>${childData.alcohoolPer}%</strong></span>
				</div>
			</div>
			<div class='card-footer text-muted'>
			<div class='text-right'>
				<a href='#' class='like-unlike mr-auto text-muted' data-post-id='${childKey}'><i
						class='${liked ? 'fas fa-heart' : 'far fa-heart'}'></i></a> <span class='likes'
					data-post-id='${childKey}'>${amountLikes}</span>
			</div>
		</div>
		</div>
	</div>
</li>
	`);

	//Executa edição in-place do post 
	$(`i[data-edit-id='${childKey}']`).on('click', function () {
		event.preventDefault();
		//Cria input/textarea e botão no msm lugar do paragrafo original
		$(`p[data-review-id='${childKey}']`).html(`
			<textarea class='post-update form-control rounded bg-light' data-text-id='${childKey}'>${childData.review}</textarea>
			<button class='save-update btn btn-outline-secondary'>Salvar</button>
			`);

		// Dispara função de salvar na base e na tela
		$(".save-update").click(saveUpdate);
	});

	function saveUpdate(event) {
		event.preventDefault();
		//Variável guarda texto novo, inputado 
		let newPost = $(`textarea[data-text-id='${childKey}']`).val();

		//Variável substitui post original
		$(`p[data-review-id='${childKey}']`).html(newPost);

		//Variável é salva na base
		database.ref('post/' + USER_ID + '/' + childKey).update({
			review: newPost
		});

		//Botão e input são excluídos
		$(".post-update").parent().remove();
		$(".save-update").parent().remove();
		console.log(newPost)
	}

}

$(document).ready(function () {
	loadPosts();
	ratingStar();

	$("#news-feed").click(function () {
		$("#post-list").html("");
		loadPosts()
	})

	$("#private-post").click(function () {
		$("#post-list").html("");
		database.ref("/post/" + USER_ID).orderByChild("privacy").equalTo("privado").once("value", function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				let childkey = childSnapshot.key;
				let childData = childSnapshot.val();
				let amountLikes = childData.likes ? childData.likes.length : 0;
				let liked = false;

				if (childData.likes) {
					if ($.inArray(USER_ID, childData.likes) != -1) {
						liked = true;
					}
				}
				appendData(childData, childkey, amountLikes, liked);
				userName()
			})
		})
	})

	// Valida se campos estão todos preenchidos no momento da digitação
	$("#container-comment input[type='text'], input[type='number'], textarea").on("keyup", function () {
		if ($(this).val() === "") {
			$(this).addClass("is-invalid");
		}
		else {
			$(this).removeClass("is-invalid");
		}
	});

	// Click executa o post, se todos campos estiverem preenchidos
	$(".add-post").click(function (event) {
		event.preventDefault();
		// Valida se todos os campos foram de fato preenchidos e barra a postagem caso não.
		let error = false
		$("#container-comment input[type='text'], input[type='number'], textarea").each(function () {
			if ($(this).val() === "") {
				$(this).addClass("is-invalid");
				error = true
			}
			else {
				$(this).removeClass("is-invalid");
			}
		})
		if (error) return

		//Adiciona valores para o objeto no firebase
		let data = {

			drinkType: $("input[class='drink']:checked").val().toUpperCase(),
			label: $("#label").val().toUpperCase(),
			review: $("#comment").val(),
			alcohoolPer: $("#alcohol").val(),
			postTime: time(),
			starScore: typeof ($("#stars li.selected").last().data("value")) === "undefined" ? 0 : $("#stars li.selected").last().data("value"),
			privacy: $("#selPrivacy option:selected").val(),
			starReply: $("#stars").html(),
		};

		//Pegando id que foi salvo no banco e mostrando na tela
		let postFromDb = database.ref("/post/" + USER_ID).push(data);
		appendData(data, postFromDb.key, 0, false);
		userName()
		$(".toast-body").html("Sua review foi adicionada ao feed :)");
		$(".toast").toast("show");

		//Reseta form e estrelas após post
		$("#container-comment")[0].reset();
		$("#stars li").removeClass("selected");

	});

	//Variável declarada global
	let selected_key = "";

	//Click pega o data-id no elemento clicado
	$(document).on("click", ".trash-ic", function () {
		selected_key = $(this).attr("data-post-id");
	});

	$("#btnDelete").click(function () {
		database.ref("post/" + USER_ID + "/" + selected_key).remove();
		$(`a[data-post-id=${selected_key}]`).closest("li").remove();
		$("#deleteModal").modal("hide");
		window.scrollTo(0, 0)
		$(".toast-body").html("O post foi deletado do feed :)");
		$(".toast").toast("show");
	});

	//1 passo: guarda o like que foi clicado e muda a cor do icone
	//2 passo: pega o id de qm está clicando
	//3 passo: validar se o cara já clicou
	//4 passo: se o cara já clicou descurtir

	$(document).on("click", ".like-unlike", function (e) {
		e.preventDefault();

		//Click pega o data-id no elemento clicado
		selected_key = $(this).attr("data-post-id");

		//valida o click para ver se o item já estava curtido(o de cima valida do banco)
		if ($(this.firstChild).attr("class") === "fas fa-heart") {
			$(this.firstChild).removeClass("fas fa-heart");
			$(this.firstChild).addClass("far fa-heart");
		}
		else {
			$(this.firstChild).removeClass("far fa-heart");
			$(this.firstChild).addClass("fas fa-heart");
		}

		//Busca na base o item que o usuário clicou para validar se a curtida será adicionado ou removida
		database.ref("/post/" + USER_ID + "/" + selected_key).once("value")
			.then(function (snapshot) {
				let values = snapshot.val();

				//verifica se existe algum like no item 
				if (values.likes) {
					//tendo, verifica se o usuário logado que deu o like
					if ($.inArray(USER_ID, values.likes) != -1) {
						//se foi o próprio usuário, ele remove o like
						values.likes.splice($.inArray(USER_ID, values.likes), 1);
					}
					else {
						//se não achou curtida, ele acrescenta uma curtida
						values.likes.push(USER_ID);
					}
				}
				//caso não tenha nenhum like ainda, cria um array e push no like
				else {
					values.likes = [];
					values.likes.push(USER_ID);
				}
				//incluo dinamicamente a quantidade de likes clicado
				$(`span[data-post-id=${selected_key}]`).html(values.likes.length);
				//atualiza qtdade de curtidas no banco
				database.ref("/post/" + USER_ID + "/" + selected_key).update(values);

			});
	});

});