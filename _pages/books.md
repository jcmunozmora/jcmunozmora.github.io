---
layout: page
title: books
permalink: /books/
description: Here you can find all information on my books and book chapters
nav: true
---

<div class="projects grid">

  {% assign sorted_books = site.books| sort: "importance" %}
  {% for book in sorted_books %}
  <div class="grid-item">
    {% if book.redirect %}
    <a href="{{ book.redirect }}" target="_blank">
    {% else %}
    <a href="{{ book.url | relative_url }}">
    {% endif %}
      <div class="card hoverable">
        {% if book.img %}
        <img src="{{ book.img | relative_url }}" alt="book thumbnail">
        {% endif %}
        <div class="card-body">
          <h2 class="card-title text-lowercase">{{ book.title }}</h2>
          <p class="card-text">{{ book.description }}</p>
          <div class="row ml-1 mr-1 p-0">
            {% if book.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ book.github }}" target="_blank"><i class="fab fa-github gh-icon"></i></a>
              </div>
              {% if book.github_stars %}
              <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                <i class="fas fa-star"></i>
                <span id="{{ book.github_stars }}-stars"></span>
              </span>
              {% endif %}
            </div>
            {% endif %}
          </div>
        </div>
      </div>
    </a>
  </div>
{% endfor %}

</div>
