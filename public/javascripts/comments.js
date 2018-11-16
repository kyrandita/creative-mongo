const visibility = {};
let newStoryForm;

const buildStoryHtml = (segment, allSegments) => {
  const children = allSegments.filter(seg => seg.parent_id === segment._id);
  if (!(segment._id in visibility)) {
    visibility[segment._id] = false;
  }
  return `
    <div class="segment">
      <p><button data-toggle-story="${segment._id}">${visibility[segment._id] ? '-' : '+'}</button>${segment.content}</p>
      <div class="children${visibility[segment._id] ? '' : ' hide'}">
        ${children.map((child) => buildStoryHtml(child, allSegments)).join('')}
        <form id="${segment._id}">
          <input type="text" name="content" />
          <button data-id=${segment._id}>Add story branch</button>
        </form>
      </div>
    </div>
  `;
}

const getComment = () => {
  $.getJSON('story', (data) => {
    parentlessStories = data.filter(story => !story.parent_id);
    $("#stories").html(parentlessStories.map(datum => buildStoryHtml(datum, data)).join(''));
  });
}

const newStarter = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const story = {content: newStoryForm.content.value};
  newStoryForm.reset();
  $.ajax({
    url: 'story',
    type: "POST",
    data: JSON.stringify(story),
    contentType: "application/json; charset=utf-8",
    success: function(data, textStatus) {
      getComment();
    }
  });
}

const addBranch = (event) => {
  if (event.target.nodeName === "BUTTON" && event.target.dataset.id) {
    event.stopPropagation();
    event.preventDefault();
    const form = document.getElementById(event.target.dataset.id);
    const branch = {parent_id: event.target.dataset.id, content: form.content.value};
    form.reset();
    $.ajax({
      url: 'story/branch',
      type: "POST",
      data: JSON.stringify(branch),
      contentType: "application/json; charset=utf-8",
      success: function (data, textStatus) {
        getComment();
      }
    });
  }
}

const toggleVisible = () => {
    if (event.target.nodeName === "BUTTON" && event.target.dataset.toggleStory) {
      visibility[event.target.dataset.toggleStory] = !visibility[event.target.dataset.toggleStory];
      getComment();
    }
}

$(document).ready(function(){
  newStoryForm = document.getElementById('newStoryForm');
  document.getElementById('newStoryFormSubmit').addEventListener('click', newStarter);
  document.addEventListener('click', addBranch);
  document.addEventListener('click', toggleVisible);
  getComment();
});
