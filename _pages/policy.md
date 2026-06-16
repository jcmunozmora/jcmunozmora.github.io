---
layout: page
permalink: /policy/
title: policy
description: I have performed consultancy services for the World Bank, USAID, UNICEF, Colombia Government as well as private firm. Here a selection of reports derived from these activities.
nav: true
---

<div class="projects grid">

  {% assign sorted_reports = site.policy | sort: "importance" %}
  {% for report in sorted_reports %}
  <div class="grid-item">
    {% if report.redirect %}
    <a href="{{ report.redirect }}" target="_blank">
    {% else %}
    <a href="{{ report.url | relative_url }}">
    {% endif %}
      <div class="card hoverable">
        {% if report.img %}
        <img src="{{ report.img | relative_url }}" alt="report thumbnail">
        {% endif %}
        <div class="card-body">
          <p class="card-text">{{ report.description }}</p>
          <div class="row ml-1 mr-1 p-0">
            {% if report.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ report.github }}" target="_blank"><i class="fab fa-github gh-icon"></i></a>
              </div>
              {% if report.github_stars %}
              <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                <i class="fas fa-star"></i>
                <span id="{{ report.github_stars }}-stars"></span>
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
