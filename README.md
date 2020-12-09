# JavaScript Project_Slideshow

This is a responsive slideshow / carousel. This slideshow will auto start running when the web page is loaded. When the user's mouse hovers over the slide area or the control dots, the slideshow will pause. When the user's mouse leaves the slide area or control dots, the slideshow will start running again.

Live site: [https://jasontwuk.github.io/JavaScript-Project_Slideshow/](https://jasontwuk.github.io/JavaScript-Project_Slideshow/)

#### Used technologies

- HTML5
- CSS3
- Vanilla JS

#### Used resource

- [Unsplash](https://unsplash.com/)

Here is how it looks like:
![alt slideshow image](slideshow.png)

## How It Works

1. Include the following code inside the `<head>` of your `HTML` file.

```
<link rel="stylesheet" href="style.css" />
<script src="script.js" type="module" defer></script>
```

2. Include the following code inside the `<body>` of your `HTML` file.

```
<!-- slideshow container -->
<div class="slideshow-container" id="slideshow-container">
  <!-- slide area -->
  <div class="slide-area">
    <!-- slide container -->
    <div class="slide-container" id="slide-container">
      <!-- slides -->
    </div>

    <!-- slide-placeholder -->
    <div class="slide-placeholder" id="slide-placeholder"></div>

    <!-- prev & next btns -->
    <a class="prev-btn" id="prev-btn">&#10094;</a>
    <a class="next-btn" id="next-btn">&#10095;</a>
  </div>

  <!-- dots-container -->
  <div class="dots-container" id="dots-container"></div>
</div>
```

3. Copy `style.css`, `script.js` and `slidesData.js` to your project. (Note: You might need to change file paths in step 1, depending on where you store your `CSS` and `JS` files.)
4. Add an img folder to your project and put your images in it.
5. Inside your `slidesData.js`, add your images’ paths and texts in the file accordingly.

```
{
  img: "path_to/your_big_image.jpg",
  img_s: "path_to/your_small_image.jpg",
  text: "your text",
},
```

6. That’s it, JavaScript will take care of the rest. 🙂
