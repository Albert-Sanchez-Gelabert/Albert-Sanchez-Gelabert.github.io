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
    Accepted / forthcoming
  </div>
  <% } %>

  <div class="publication-links">

    <% if (item.doi_url) { %>
      <a href="<%- item.doi_url %>" target="_blank">DOI</a>
    <% } %>

    <% if (item.free_access) { %>
      <a href="<%- item.free_access %>" target="_blank">Free access</a>
    <% } %>

    <% if (item.manuscript) { %>
      <a href="<%- item.manuscript %>" target="_blank">Accepted manuscript</a>
    <% } %>

  </div>

</div>

<%
}
%>

</div>
```
