// transparent menu bar scroll
const menuBar = document.getElementById('menu-scroll');

// Check the initial scroll position and set the visibility accordingly
if (window.scrollY > 50) {
  menuBar.classList.add('scrolled');
} else {
  menuBar.classList.remove('scrolled');
}

// Add an event listener for the scroll event
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Change '50' to the threshold you prefer
    menuBar.classList.add('scrolled');
  } else {
    menuBar.classList.remove('scrolled');
  }
});// end of trnasparent menu code

/* small screen menu displayer */
// Show or hide the menu
// Menu toggle for small screens
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  toggle.addEventListener('click', () => {
    // Toggle the 'active' class for menu visibility
    nav.classList.toggle('active');
    // Toggle the 'show-icon' class for changing the menu button icon
    toggle.classList.toggle('show-icon');
  });
};

// Initialize the menu toggle function
showMenu('nav-toggle', 'menu-bar-id');
// end of menu toggle 

/* this is code is also responsible for toggling the menu bar items on small screens */
// Function to run code only on screens <= 767.98px
function runDropdownLogic() {
  if (window.matchMedia("(max-width: 767.98px)").matches) {
    document.addEventListener("DOMContentLoaded", () => {
      // Handle About Us and Industries
      const dropdownItems = document.querySelectorAll(".menu-bar-list > li > .menu-list");
      dropdownItems.forEach(item => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          const submenu = item.nextElementSibling;
          const arrowIcon = item.querySelector('.dropdown-arrow');

          document.querySelectorAll(".menu-bar-list > li > .submenu-list").forEach(menu => {
            if (menu !== submenu) {
              menu.style.display = "none";
              const otherArrowIcon = menu.previousElementSibling.querySelector('.dropdown-arrow');
              if (otherArrowIcon) {
                otherArrowIcon.classList.remove('fa-chevron-up');
                otherArrowIcon.classList.add('fa-chevron-down');
              }
            }
          });

          if (submenu && submenu.tagName === "UL") {
            if (submenu.style.display === "block") {
              submenu.style.display = "none";
              arrowIcon.classList.remove('fa-chevron-up');
              arrowIcon.classList.add('fa-chevron-down');
            } else {
              submenu.style.display = "block";
              arrowIcon.classList.remove('fa-chevron-down');
              arrowIcon.classList.add('fa-chevron-up');
            }
          }
        });
      });
    });

    document.addEventListener("DOMContentLoaded", () => {
      const allSubmenus = document.querySelectorAll('.submenu-group .submenu-list');
      allSubmenus.forEach(submenu => {
        submenu.style.display = 'none';
      });

      const parentMenus = document.querySelectorAll(".menu-bar-list > li > .menu-list");
      parentMenus.forEach(menu => {
        menu.addEventListener("click", (e) => {
          e.preventDefault();

          const parentLi = menu.parentElement;
          const arrowIcon = menu.querySelector('.dropdown-arrow');

          document.querySelectorAll('.menu-bar-list > li.open').forEach(openLi => {
            if (openLi !== parentLi) {
              openLi.classList.remove('open');
              const submenu = openLi.querySelector('.submenu-list');
              if (submenu) submenu.style.display = 'none';
              const otherArrowIcon = openLi.querySelector('.dropdown-arrow');
              if (otherArrowIcon) {
                otherArrowIcon.classList.remove('fa-chevron-up');
                otherArrowIcon.classList.add('fa-chevron-down');
              }
            }
          });

          const submenuGroup = parentLi.querySelector('.submenu-group');
          if (submenuGroup) {
            parentLi.classList.toggle('open');
            submenuGroup.style.display = parentLi.classList.contains('open') ? 'block' : 'none';

            if (parentLi.classList.contains('open')) {
              arrowIcon.classList.remove('fa-chevron-down');
              arrowIcon.classList.add('fa-chevron-up');
            } else {
              arrowIcon.classList.remove('fa-chevron-up');
              arrowIcon.classList.add('fa-chevron-down');
            }
          }
        });
      });

      const strongHeaders = document.querySelectorAll(".submenu-group strong");
      strongHeaders.forEach(strong => {
        const icon = strong.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }

        strong.addEventListener("click", (e) => {
          e.stopPropagation();
          const submenu = strong.nextElementSibling;
          const icon = strong.querySelector('i');
          const arrowIcon = strong.querySelector('.dropdown-arrow');

          document.querySelectorAll(".submenu-group strong").forEach(otherStrong => {
            if (otherStrong !== strong) {
              const otherSubmenu = otherStrong.nextElementSibling;
              const otherIcon = otherStrong.querySelector('i');
              if (otherSubmenu) otherSubmenu.style.display = 'none';
              if (otherIcon) {
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
              }
            }
          });

          if (submenu) {
            if (submenu.style.display === 'flex') {
              submenu.style.display = 'none';
              if (icon) {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
              }
              if (arrowIcon) {
                arrowIcon.classList.remove('fa-chevron-up');
                arrowIcon.classList.add('fa-chevron-down');
              }
            } else {
              submenu.style.display = 'flex';
              if (icon) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
              }
              if (arrowIcon) {
                arrowIcon.classList.remove('fa-chevron-down');
                arrowIcon.classList.add('fa-chevron-up');
              }
            }
          }
        });
      });
    });
  }
}

// Run the function on page load
runDropdownLogic();

// Re-run the logic when resizing the window
window.addEventListener('resize', runDropdownLogic);
// end of code that toggle menu items on small screen

/* code to toggle the more services items */
document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-subservices'); // Select all buttons
    const allSubservices = document.querySelectorAll('.subservices-list'); // Select all subservices lists

    toggleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default action (if any)
            e.stopPropagation(); // Stop propagation to prevent document click handler

            const targetId = this.getAttribute('data-target');
            const targetSubservices = document.getElementById(targetId);

            // Check if the current subservices are already visible
            if (targetSubservices.style.display === 'none' || targetSubservices.style.display === '') {
                // Close all subservices and reset the text and arrow for all buttons
                allSubservices.forEach(subservice => {
                    subservice.style.display = 'none'; // Hide all other subservices
                });

                toggleButtons.forEach(btn => {
                    const arrowIcon = btn.querySelector('.fa-chevron-up, .fa-chevron-down');
                    const linkText = btn.querySelector('span');
                    if (arrowIcon) {
                        arrowIcon.classList.replace('fa-chevron-up', 'fa-chevron-down'); // Reset arrow to down
                    }
                    if (linkText) {
                        linkText.textContent = linkText.textContent.replace('Hide all', 'See all')
                            .replace('Hide maintenance services', 'Explore maintenance services')
                            .replace('Hide design services', 'View design services'); // Reset text for each button
                    }
                });

                // Now open the selected subservices
                targetSubservices.style.display = 'block';
                this.querySelector('.fa-chevron-down').classList.replace('fa-chevron-down', 'fa-chevron-up'); // Rotate arrow up
                this.querySelector('span').textContent = this.querySelector('span').textContent.replace('See all', 'Hide all')
                    .replace('Explore maintenance services', 'Hide maintenance services')
                    .replace('View design services', 'Hide design services'); // Change text to "Hide all"
            } else {
                // If the subservices are visible, hide them
                targetSubservices.style.display = 'none';
                this.querySelector('.fa-chevron-up').classList.replace('fa-chevron-up', 'fa-chevron-down'); // Rotate arrow down
                this.querySelector('span').textContent = this.querySelector('span').textContent.replace('Hide all', 'See all')
                    .replace('Hide maintenance services', 'Explore maintenance services')
                    .replace('Hide design services', 'View design services'); // Change text to "See all"
            }
        });
    });

    // Close subservices if clicking elsewhere on the page
    document.addEventListener('click', function (e) {
        let clickedInside = false;

        toggleButtons.forEach(button => {
            if (button.contains(e.target)) {
                clickedInside = true; // Clicked on a toggle button
            }
        });

        allSubservices.forEach(subservice => {
            if (subservice.contains(e.target)) {
                clickedInside = true; // Clicked inside a subservice list
            }
        });

        if (!clickedInside) {
            allSubservices.forEach(subservice => {
                subservice.style.display = 'none'; // Hide all subservices
            });

            toggleButtons.forEach(btn => {
                const arrowIcon = btn.querySelector('.fa-chevron-up, .fa-chevron-down');
                const linkText = btn.querySelector('span');
                if (arrowIcon) {
                    arrowIcon.classList.replace('fa-chevron-up', 'fa-chevron-down'); // Reset arrow to down
                }
                if (linkText) {
                    linkText.textContent = linkText.textContent.replace('Hide all', 'See all')
                        .replace('Hide maintenance services', 'Explore maintenance services')
                        .replace('Hide design services', 'View design services'); // Reset text for each button
                }
            });
        }
    });
});//end of code that display more services

/* code to display the and hide the FAQ answers */
(() => {
  const faqSectionId = document.querySelector('.faq-section').id; // Will get the ID of the current section

    const faqButtons = document.querySelectorAll(`#${faqSectionId} .faq-question`);    
    faqButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const faqItem = button.parentElement;
            const icon = button.querySelector(".faq-icon");

            // Close any other open FAQ items
            document.querySelectorAll(".faq-item.active").forEach((activeItem) => {
                if (activeItem !== faqItem) {
                    activeItem.classList.remove("active");
                    const activeIcon = activeItem.querySelector(".faq-icon");
                    if (activeIcon) activeIcon.textContent = "+"; // Reset icon
                }
            });

            // Toggle the current FAQ item
            const isActive = faqItem.classList.contains("active");
            faqItem.classList.toggle("active", !isActive);
            icon.textContent = !isActive ? "x" : "+";

            // Stop event propagation to prevent the document click listener from closing this FAQ
            event.stopPropagation();
        });
    });

    // Close any open FAQ when clicking anywhere else on the screen
    document.addEventListener("click", () => {
        document.querySelectorAll(".faq-item.active").forEach((activeItem) => {
            activeItem.classList.remove("active");
            const activeIcon = activeItem.querySelector(".faq-icon");
            if (activeIcon) activeIcon.textContent = "+"; // Reset icon
        });
    });
})();//end of code that display and hide FAQ answer

/* code that handle get quote functionality */
 /* code for the get quote */
//  document.getElementById("file-upload").addEventListener("change", function () {
//     const fileList = document.getElementById("file-list");
//     fileList.innerHTML = ""; // Clear previous file list
  
//     const files = this.files;
//     const maxFiles = 5;
//     const maxFileSize = 2 * 1024 * 1024; // 2MB
  
//     if (files.length > maxFiles) {
//       alert(`You can only upload up to ${maxFiles} files.`);
//       this.value = ""; // Reset the input
//       return;
//     }
  
//     Array.from(files).forEach((file) => {
//       if (file.size > maxFileSize) {
//         alert(`${file.name} exceeds the 2MB size limit.`);
//         this.value = ""; // Reset the input
//         return;
//       }
  
//       const fileName = document.createElement("span");
//       fileName.textContent = file.name;
//       fileList.appendChild(fileName);
//     });
//   });
//   document.getElementById('file-upload').addEventListener('change', function () {
//     const fileList = document.querySelector('.file-list');
//     fileList.innerHTML = ''; // Clear the list
  
//     for (let file of this.files) {
//       const listItem = document.createElement('div');
//       listItem.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
//       fileList.appendChild(listItem);
//     }
//   });

// code for the slide show in javascript html
// Select the elements
const carouselContainer = document.querySelector('.carousel-container-javascript');
const prevBtn = document.querySelector('.prev-btn-javascript');
const nextBtn = document.querySelector('.next-btn-javascript');

// Define variables
let currentIndex = 0; // Keeps track of the current slide index
const items = document.querySelectorAll('.carousel-item-javascript'); // All items
const itemWidth = document.querySelector('.carousel-item-javascript').clientWidth; // Width of one item

// Function to calculate the number of visible items based on screen width
function getItemsVisible() {
  const containerWidth = document.querySelector('.carousel-slide-javascript').clientWidth; // Visible container width
  return Math.floor(containerWidth / itemWidth); // Calculate how many items fit in the visible area
}

// Function to calculate the maximum index
function getMaxIndex() {
  return Math.ceil(items.length / getItemsVisible()) - 1; // Dynamically calculate max index
}

// Function to update the carousel's position
function updateCarouselPosition() {
  const offset = -currentIndex * getItemsVisible() * itemWidth; // Calculate the translateX offset
  carouselContainer.style.transform = `translateX(${offset}px)`; // Apply the offset
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  if (currentIndex < getMaxIndex()) {
    currentIndex++;
    updateCarouselPosition();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselPosition();
  }
});

// Handle screen resizing
window.addEventListener('resize', () => {
  // Reset carousel position when resizing (optional)
  currentIndex = 0;
  updateCarouselPosition();
});
// end of javascript slide show code
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", function () {
    const item = this.parentElement;
    item.classList.toggle("active");
  });
});