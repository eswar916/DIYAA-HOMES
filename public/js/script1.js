const viewmore = document.querySelector('.view-more')
const viewless = document.querySelector('.view-less')
const moreHighlights = document.querySelector('.more-highlights');


viewmore.addEventListener('click',toggleMoreHighlights)

function toggleMoreHighlights(event) {
    event.preventDefault();
    
    const viewMoreLink = event.target;
    
    moreHighlights.style.display = 'block';
    viewless.style.display = 'inline-block';
    viewmore.style.display = 'none';

}

viewless.addEventListener('click', togglelessHighlights)

function togglelessHighlights(event) {
    event.preventDefault()
    moreHighlights.style.display = 'none';
    viewless.style.display = 'none';
    viewmore.style.display = 'inline-block';
}