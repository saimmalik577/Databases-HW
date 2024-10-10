/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
}

a {
  text-decoration: none;
  color: inherit;
}

h3, h5 {
  margin: 0;
}

/* Layout Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-x-6 {
  gap: 1.5rem;
}

.gap-y-8 {
  gap: 2rem;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}

.items-center {
  align-items: center;
}

.mt-12, .mt-16 {
  margin-top: 3rem;
}

/* Slider Styles */
.slider-container {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.slider-slide {
  display: flex;
  justify-content: space-between;
  padding: 3rem;
  background-color: #007bff;
  color: white;
  height: 28rem;
  gap: 2rem;
}

.slider-slide:nth-child(2) {
  background-color: #f8f9fa;
  color: #007bff;
}

.slider-slide h3 {
  font-size: 2rem;
  font-weight: bold;
}

.slider-slide p {
  max-width: 20rem;
  font-size: 1.125rem;
  line-height: 1.5;
}

.slider-slide img {
  max-width: 20rem;
  object-fit: contain;
}

/* Button Styles */
button, .button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover, .button:hover {
  background-color: #0056b3;
}

button.secondary {
  background-color: #6c757d;
}

button.secondary:hover {
  background-color: #5a6268;
}

/* Section Styles */
.home-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
}

.home-section img {
  max-width: 24rem;
  object-fit: contain;
}

/* Card Styles */
.card {
  flex: 1;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  text-align: center;
}

.card img {
  max-width: 100%;
  object-fit: contain;
}

.card h5 {
  font-size: 1.125rem;
  font-weight: bold;
  margin-top: 1rem;
}

/* Utility Styles */
.w-full {
  width: 100%;
}

.w-fit {
  width: fit-content;
}

.object-contain {
  object-fit: contain;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.p-12 {
  padding: 3rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

/* Text Styles */
.text-primary {
  color: #007bff;
}

.text-secondary {
  color: #6c757d;
}

.text-lg {
  font-size: 1.125rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-bold {
  font-weight: bold;
}

/* Custom Borders */
.border {
  border-width: 1px;
  border-style: solid;
}

.border-paper-contrast {
  border-color: rgba(0, 0, 0, 0.25);
}

/* Spacing */
.mt-12 {
  margin-top: 3rem;
}

.mt-16 {
  margin-top: 4rem;
}

/* Specific Styles for Homepage Layout */
.homepage-header {
  background-color: #007bff;
  color: white;
  padding: 2rem;
  text-align: center;
}

.homepage-content {
  padding: 4rem 0;
}

.homepage-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
