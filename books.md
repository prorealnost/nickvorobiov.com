---
layout: page
title: Книги Николая Воробьёва
subtitle: Сделаю из тебя победителя
picture: books.jpg
---

{% assign books = site.books | sort: 'orderindex' %}
<div class="row">
  {% for book in books %}
    <div class="col-xs-6 col-sm-4">
      <a href="{{ book.url }}">
        <h4 class="text-center"><nobr>{{ book.category }}</nobr></h4>
        <p class="text-center">{{ book.title }}</p>
        <img class="img-responsive" src="{{ site.post_pictures }}{{ book.picture }}"/>
      </a>
    </div>
  {% endfor %}
</div>