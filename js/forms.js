// calculator

var appForm = document.querySelector('.application .form');
var listsTitleArr = ['title', 'color', 'pattern', 'transport'];
var transportCheckBox = document.querySelector('.application .form .checkbox');

var defaultTypeLabel = document.querySelector('.application .form .drop_down_list:nth-of-type(1) .list_label').innerText;
var defaultColorLabel = document.querySelector('.application .form .drop_down_list:nth-of-type(2) .list_label').innerText;
var defaultPatternLabel = document.querySelector('.application .form .drop_down_list:nth-of-type(3) .list_label').innerText;
var defaultSummaryTitle = document.querySelector('.application .panel_left .title').innerText;

function togglePanelClass(arrow, list) {
    list.classList.toggle('list_panel_show');
    arrow.classList.toggle('list_arrow_rotate');
}

function setLabel(label, element){
    element.innerText = label;
}

function addingUp(summaryPriceElements){
    var sum = 0;
    Array.from(summaryPriceElements).forEach(function(summaryPriceElement){
        var price = parseInt(summaryPriceElement.innerText);
        if(!isNaN(price)){
            sum += price;
        }
    });
    return sum;
}

function summary(element, list, option) {
    var price = 0;
    var title = list.dataset.name;
    if(!!element){
        price = element.dataset.price;
    }
    var summaryNameElement = document.querySelector('.application .summary_panel .panel_left').children;
    var summaryPriceElements = document.querySelector('.application .summary_panel .panel_right').children;
    var sumElement = document.querySelector('.application .summary_panel .sum strong');
    
    summaryNameElement[listsTitleArr.indexOf(title)].innerText = option;
    if(price !== 0){
        summaryPriceElements[listsTitleArr.indexOf(title)].innerText = price  + ' zł';
    } else {
        summaryPriceElements[listsTitleArr.indexOf(title)].innerText = '';
    }
    
    sumElement.innerText = addingUp(summaryPriceElements) + ' zł';
}

function setDefault(event) {
    document.querySelector('.application .form .drop_down_list:nth-of-type(1) .list_label').innerText = defaultTypeLabel;
    document.querySelector('.application .form .drop_down_list:nth-of-type(2) .list_label').innerText = defaultColorLabel;
    document.querySelector('.application .form .drop_down_list:nth-of-type(3) .list_label').innerText = defaultPatternLabel;
    document.querySelector('.application .form [type="checkbox"]').checked = false;

    var sumNameElements = Array.from(document.querySelector('.application .summary_panel .panel_left').children);
    var sumPriceElements = Array.from(document.querySelector('.application .summary_panel .panel_right').children);

    sumNameElements.forEach(function(sumNameElement){
        sumNameElement.innerText = '';
    });
    sumPriceElements.forEach(function(sumPriceElement){
        sumPriceElement.innerText = '';
    });

    document.querySelector('.application .panel_left .title').innerText = defaultSummaryTitle;

    document.querySelector('.application .summary_panel .sum strong').innerText = '';

    event.target.removeEventListener('click', setDefault);
    event.target.disabled = true;
}

function setBtnActive (btn){
    btn.disabled = false;
    btn.addEventListener('click', setDefault);
}

function chooseOption(event) {
    if(event.target.tagName === 'LI') {
        var option = event.target.innerText;
        var curElement = event.target;
        var curElLabel = event.target.parentElement.previousElementSibling.previousElementSibling;
        var curElArrow = event.target.parentElement.previousElementSibling;
        var curElList = event.target.parentElement;
        togglePanelClass(curElArrow, curElList);
        this.removeEventListener('click', chooseOption);
        setLabel(option, curElLabel);
        summary(curElement, curElList, option);

        var formBtn = document.querySelector('.application input[type="button"]');
        var chairName = document.querySelector('.application .panel_left .title').innerText;
        
        if(chairName !== defaultSummaryTitle && formBtn.disabled){
            setBtnActive(formBtn);
        }

    }
}

function toggleListsPanel(event){
    if(event.target.classList.contains('list_arrow')){
        var currentList = event.target.nextElementSibling;
        var currentArrow = event.target;
        togglePanelClass(currentArrow, currentList);
        
        if(currentList.classList.contains('list_panel_show')){
            currentList.addEventListener('click', chooseOption);
        }
        
    } else if(event.target.classList.contains('list_label')) {
        var currentList = event.target.nextElementSibling.nextElementSibling;
        var currentArrow = event.target.nextElementSibling;
        togglePanelClass(currentArrow, currentList);
        
        if(currentList.classList.contains('list_panel_show')){
            currentList.addEventListener('click', chooseOption);
        }
    }
}

function toggleTransport(event) {
    var checkboxElement = this.querySelector('[type="checkbox"]');
    if(checkboxElement.checked){
        summary(checkboxElement, checkboxElement.parentElement, 'Transport');
    } else {
        summary(null, checkboxElement.parentElement, '');
    }
}

appForm.addEventListener('click', toggleListsPanel);
transportCheckBox.addEventListener('change', toggleTransport);



// form

var nameInput = document.querySelector('.contact .contact-box:first-child input:first-child');
var emailInput = document.querySelector('.contact .contact-box:first-child input:nth-child(2)');
var txtArea = document.querySelector('.contact .contact-box textarea');
var contactCheckbox = document.querySelector('.contact .contact-box input[type="checkbox"]');

function setContactFormDefault(event){
    nameInput.value = '';
    emailInput.value = '';
    txtArea.value = '';
    contactCheckbox.checked = false;
    this.disabled = true;
    this.removeEventListener('click', setContactFormDefault);
}

function setActiveContactBtn(){
    var contactFormBtn = document.querySelector('.contact .contact-box input[type="button"]');
    if(!!nameInput.value && !!emailInput.value && !!txtArea.value && contactCheckbox.checked){
        contactFormBtn.disabled = false;
        contactFormBtn.addEventListener('click', setContactFormDefault);
    } else {
        contactFormBtn.disabled = true;
        event.target.removeEventListener('click', setContactFormDefault);
    }
}

nameInput.addEventListener('input', setActiveContactBtn);
emailInput.addEventListener('input', setActiveContactBtn);
txtArea.addEventListener('input', setActiveContactBtn);
contactCheckbox.addEventListener('change', setActiveContactBtn);