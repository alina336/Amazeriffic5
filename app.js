var organizeByTags = function (toDoObjects) {

	console.log("organizeByTags called");
	// создание пустого массива для тегов
	var tags = [];
	// перебираем все задачи toDos
	toDoObjects.forEach(function (toDo) {
		// перебираем все теги для каждой задачи
		toDo.tags.forEach(function (tag) {
			// убеждаемся, что этого тега еще нет в массиве
			if (tags.indexOf(tag) === -1) {
				tags.push(tag);
			}
		});
	});
	console.log(tags);

	var tagObjects = tags.map(function (tag) {
		// здесь мы находим все задачи, содержащие этот тег
		var toDosWithTag = [];
		toDoObjects.forEach(function (toDo) {
			// проверка, что результат  indexOf is *не* равен -1
			if (toDo.tags.indexOf(tag) !== -1) {
				toDosWithTag.push(toDo.description);
			}
		});
		// мы связываем каждый тег с объектом, который  содержит название тега и массив
		return { "name": tag, "toDos": toDosWithTag };
	});
	console.log(tagObjects);
	return tagObjects;
};




var main = function (toDoObjects) { 
	"use strict";
	var toDos = toDoObjects.map(function (toDo) {
		// просто возвращаем описание этой задачи
		return toDo.description;
	});
	// сейчас весь старый код должен работать как раньше!
	$("document").ready( function(){

		$(".tabs a span").toArray().forEach(function (element) { 
			// создаем обработчик щелчков для этого элемента 
			$(element).on("click", function () {
				// поскольку мы используем версию элемента jQuery,
				// нужно создать временную переменную,
				// чтобы избежать постоянного обновления
				var $element = $(element),
				$content;
				$(".tabs a span").removeClass("active");
				$element.addClass("active");
				$("main .content").empty();
				if ($element.parent().is(":nth-child(1)")) {
					for (var i = toDos.length-1; i > -1; i--) { 
						$(".content").append($("<li>").text(toDos[i]));
					}
				} 
				else if ($element.parent().is(":nth-child(2)")) {
					$content = $("<ul>");
					toDos.forEach(function (todo) {
							$content.append($("<li>").text(todo));
					});
					$("main .content").append($content);
				} 
				else if ($element.parent().is(":nth-child(3)")) {
					// ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ
					console.log("щелчок на вкладке Теги");
					var organizedByTag = organizeByTag(toDoObjects);
					organizedByTag.forEach(function (tag) {
						var $tagName = $("<h3>").text(tag.name),
						$content = $("<ul>");
						tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
						});
						$("main .content").append($tagName);
						$("main .content").append($content);
					});
				}
				else if ($element.parent().is(":nth-child(4)")) {
					$(".content").append(
						'<input type="text" class="inp">'+ '<button class="btn">+</button>'
					);
					var newToDo;
					$('.btn').on('click',function(){
					if (($(".inp").val() !== "") && (($(".inp").val()).trim().length > 0)){
						newToDo= $('.inp').val();
						if (newToDo!='') {
							toDos.push( newToDo);
							alert('Новое задание "'+newToDo+'" успешно добавлено!');
							$('.inp').val("");
						}
					}
					})
					$(".inp").keypress(function(event) {
						if (($(".inp").val() !== "") && (($(".inp").val()).trim().length > 0)){
						if (event.which == 13) {
						newToDo= $('.inp').val();
						if (newToDo!='') {
							toDos.push( newToDo);
							alert('Новое задание "'+newToDo+'" успешно добавлено!');
							$('.inp').val("");
						}
						}
					}
					})
		
				}
				return false;
			})
		})
		
		$(".tabs a:first-child span").trigger("click");
		
		})

	var addCommentFromInputBox = function () {
		var $new_comment;
		if ($(".comment-input input").val() !== "") {
			$new_comment = $("<p>").text($(".comment-input input").val());
			$new_comment.hide();
			$(".comments").append($new_comment);
			$new_comment.fadeIn();
			$(".comment-input input").val("");
		}
	};
	$(".comment-input button").on("click", function (event) {
		addCommentFromInputBox();
	});
	$(".comment-input input").on("keypress", function (event) {
		if (event.keyCode === 13) {
			addCommentFromInputBox();
		}
	});
};
$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
	// вызов функции main с аргументом в виде объекта toDoObjects 
		main(toDoObjects);
	});
}); 