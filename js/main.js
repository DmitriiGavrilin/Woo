// Selectors

var x, i, j, l, ll, selElmnt, a, b, c;
/* ищем любой элемент с классом "custom-select" */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* для каждого элемента создаем новый элемент DIV, который будет работать как элемент выбора */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* для каждого элемента создаем новый элемент DIV, который будет содержать список опций */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* для каждой опции в оригинальном выпадающем списке
        создаем новый элемент DIV, который будет работать как опция */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* когда на элемент кликают, обновляем оригинальный выпадающий список
            и выбранный элемент */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* когда на выпадающий список кликают, закрываем другие элементы выбора
        и открываем/закрываем текущий элемент выбора */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    /* функция, которая закрывает все элементы выбора в документе
    кроме текущего */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/* если пользователь кликает за пределами выпадающего списка,
то все элементы выбора закрываются */
document.addEventListener("click", closeAllSelect);


// Counter

const counters = document.querySelectorAll('[data-counter]');
if (counters) {
    counters.forEach(counter => {
       counter.addEventListener("click", function(e) {
           const target = e.target;
           e.preventDefault();
           if (target.closest('.counter-button')) {
               let value = parseInt(target.closest('.counter').querySelector('input').value);
               if (target.classList.contains('counter-button-plus')) {
                   value ++;
               } else {
                   --value;
               }
               if (value <= 0) {
                   value = 0;
                   target.closest('.counter').querySelector('.counter-button-minus').classList.add('disabled');
               } else {
                   target.closest('.counter').querySelector('.counter-button-minus').classList.remove('disabled');
               }
               target.closest('.counter').querySelector('input').value = value;
           }
       });
    });
}


// Accordion

$('[data-collapse]').on('click', function (e) {
    let elementId = $(this).data('collapse');
    $(this).toggleClass("open");
    e.preventDefault();
})