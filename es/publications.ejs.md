```{=html}
<div class="publications-list list">

<%
let currentYear = null;

for (const item of items) {

  if (item.year !== currentYear) {
    currentYear = item.year;
%>

<h2 class="publication-year"><%= currentYear %></h2>

<%
  }
%>

<div class="publication-item" <%= metadataAttrs(item) %>>

  <div class="publication-title listing-title">
    <strong><%= item.title %></strong>
  </div>

  <% if (item.author) { %>
  <div class="publication-authors listing-author">
    <%= item.author %>
  </div>
  <% } %>

  <% if (item.journal) { %>
  <div class="publication-journal">
    <em><%= item.journal %></em><%
      if (item.volume) { %>, <%= item.volume %><% }
      if (item.issue) { %>(<%= item.issue %>)<% }
      if (item.pages) { %>, <%= item.pages %><% }
    %>
  </div>
  <% } %>

  <% if (item.status === "Accepted") { %>
  <div class="publication-status">
    Aceptado / pendiente de publicación
  </div>
  <% } %>

  <div class="publication-links">

    <% if (item.doi_url) { %>
      <a href="<%- item.doi_url %>" target="_blank">DOI</a>
    <% } %>

    <% if (item.free_access) { %>
      <a href="<%- item.free_access %>" target="_blank">Acceso libre</a>
    <% } %>

    <% if (item.manuscript) { %>
      <a href="<%- item.manuscript %>" target="_blank">Manuscrito aceptado</a>
    <% } %>

    <% if (item.doi === "10.1080/21568235.2025.2556438" || item.doi_url === "https://doi.org/10.1080/21568235.2025.2556438") { %>
      <a href="dissecting/university-trajectories/index.html" class="publication-dissect-link">Dentro de este estudio · Pilot ↗</a>
    <% } %>

  </div>

</div>

<%
}
%>

</div>
```
