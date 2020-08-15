---
layout: page
permalink: /publications/
title: publications
description: Here you can find my latest publication information
years: [2020,2019,2018,2017,2015,2013,2012,2011,2010,2008,2007,2005]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
