/* =========================================================
   SITE CONTENT: edit this file only.
   Add or remove items freely; the pages rebuild themselves.
   Image paths are relative to index.html (e.g. "images/photo1.jpg").
   Leave a field as "" (or delete it) to skip it.
   ========================================================= */

// Masthead title
var TITLE = "The Method";

/* ---------------------------------------------------------
   TIMELINE EVENTS
   date : shown on the stamp (a year, a month, or any text)
   head : the headline on the clipping
   text : the short blurb shown on the clipping
   note : (optional) longer text for the sticky note. If left
          out, the sticky note shows "text". A blank line
          (\n\n) starts a new paragraph.
   image: (optional) path to a photo that gets pinned around the
          sticky note like a polaroid. For several photos use a
          list: ["images/a.jpg", "images/b.jpg"]
   color: (optional) "yellow" or "green". Alternates if omitted.
   --------------------------------------------------------- */
var EVENTS = [
  {
    date: "1927",
    head: "Burdell is First Admitted to Tech",
    text: "",
    note: "In 1927, Ed Smith sent two enrollment forms for admission to Georgia Tech. One form was for himself, while on another he put a name that combined George P. Butler, his prep school headmaster, with his friend's mother’s maiden name, Burdell. Both were officially admitted to tech later that year. With the help of his friends, they would do all of the homework and tests twice, changing the handwriting so teachers wouldn’t catch on. In 1930, Burdell was awarded a bachelor's degree.",
    image: "reportcard.png"
  },
  {
    date: "1928",
    head: "Burdell's revenge by ordering furniture",
    text: "",
    note: "After being rejected by a fraternity a student wanted to join, he ordered a truckload of furniture to be delivered to the fraternity, meant to be paid cash on delivery. The order was credited to Burdell\n\n(Image shown is an example)",
    image: "furniture.jpg"
  },
  {
    date: "1941-1945",
    head: "Burdell in WWII",
    text: "",
    note: "During World War II, service members kept the hoax going, with Burdell's name appearing many different times. He appeared on the crew roster of a B-17 Bomber with the 8th Air Force and was credited with 12 missions over Europe. This continued until a Georgia Tech graduate became the new operations officer, recognized the name, and put an end to this part of the prank",
    image: "wwii.jpg"
  },
  {
    date: "1969",
    head: "Burdell is enrolled in every class",
    text: "",
    note: "Georgia Tech switched from physical to digital registration for classes in 1969. When this change happened, a few people working in the registrar's office enrolled Burdell in every class, amounting to over 3000 credit hours.",
    image: "bsce.jpg"
  },
  {
    date: "1990",
    head: "Burdell completes every major",
    text: "",
    note: "Since enrollment, Burdell has completed every undergraduate degree, and many people say that he never really left the school. His first degree was a BS in Ceramic Engineering and he later earned a masters from the same school. At one point, he was also signed up for over 3,000 credit hours in the Georgia Tech class registration database.",
    image: "Burdell1.jpg"
  },
  {
    date: "2001",
    head: "Time Magazine person of the year",
    text: "",
    note: "In 2001, George P. Burdell was nearly awarded the title of Time Magazine’s Person of the Year. Time allowed people to nominate anyone for the award, so Georgia Tech students all cast their votes for Burdell. He led the poll with over 36% of all votes cast, and for a while, it seemed like there was nothing that could stop him. However, Time disqualified him immediately upon discovering that he was not a real person. With Burdell out of the running, George W. Bush came out on top and became the Person of the Year.",
    image: "manoftheyear.jpg"
  },
  {
    date: "Today",
    head: "The Story Continues",
    text: "",
    note: "Burdell connects people",
    image: "sidebyside.png"
  }
];

/* ---------------------------------------------------------
   MINI-STORIES (3 boxes per row on wide screens)
   title: shown on the box
   text : shown on the sticky note. Blank line = new paragraph.
   icon : (optional) small image shown next to the title on the box
   image: (optional) polaroid(s) pinned around the sticky note,
          same as for timeline events
   color: (optional) "yellow" or "green". Alternates if omitted.
   --------------------------------------------------------- */
var STORIES = [
  { title: "Burdell’s Birthday Parties",   text: "Occasionally, students and organizations at Tech throw a birthday party for Burdell. At these parties students honor Burdell in various ways. At one party, they had a giant cake, they gave a presentation about Burdell’s life, and then participated in silly games and contests, such as a pie throwing contest and a phone booth stuffing contest. Although Burdell’s birthday is most widely recognized to be on April 1, the first birthday party ever thrown for Burdell was on September 15, 2000. This party brought lots of people together, as it was only made possible with the combined efforts of several groups, including Presidents’ Council, the Student Center, the Ramblin’ Reck Club, the Alumni Association, the bookstore, Campus Optical, Junior’s, dining services, and the Georgia Tech Band and Cheerleaders. Chris Young, the Master of Ceremonies of this event, stated that a large part of the reason for hosting this event was to create a sense of community at Tech.", icon: "https://uxwing.com/wp-content/themes/uxwing/download/festival-culture-religion/birthday-icon.png", image: "Burdell3.jpg" },
  { title: "Burdell’s RAT Cap",   text: "This is a photo of a RAT cap belonging to George P. Burdell. The cap shows that his major was electrical engineering at the time, and that his hometown is Techville, Georgia. It also shows a few of the final scores of football games from that year. Based on the scores visible on the cap, this RAT cap was most likely from the year 1974. This cap helps understand part of Burdell’s history. \nThis is a photo of Burdell’s RAT cap sitting on top of the book Dress Her in White and Gold by Robert B. Wallace Jr. and a book titled Statistics by Hays. These books may have been what Burdell was reading at the time. Burdell’s major, electrical engineering, and hometown, Techville, are displayed on the cap. Three scores from football games are right-side up on the cap, indicating that Tech won those games. There is a black ring around the button on top of the cap, indicating that Burdell has completed a co-op.", icon: "cap.png", image: "Burdell2.png" },
  { title: "Burdell Was Here Instagram Filter", text: "One way students at Georgia Tech keep the tradition of Burdell alive is by either writing or photoshopping the phrase “Burdell was here” in various places both on and off Tech Campus. In 2022, Scott Dinerman, creative director for the GT Alumni Association, and Marvin Crumbs, fourth-year CM major, worked together to create an Instagram filter that uses augmented reality to put the words “Burdell was here” onto any flat surface. This was difficult work, especially because they both had to learn to use Spark AR in Facebook Meta, which was what they used to create the filter. They released the filter on April 1 to honor Burdell’s birthday. This filter made it even easier for people to take Burdell with them wherever they go. While he was talking about why he wanted to make the filter, Scott Dinerman said “Burdell is all of us. It’s just a fun way to create community among students, current students and former students, because we’ve all been there. We all know what it’s like to pull all-nighters and hope that you pass and go to labs and job-hunting.” This shows that Burdell helps students at Georgia Tech feel connected because he represents their shared experiences.", icon: "instagram.png", image: "", color: "green" },
  { title: "Burdell Cannot Die",  text: "On the 12th of Never, Marilyn Somers conducted an interview with George P. Burdell to learn more about his life and stories. The transcript and recording of the interview will not be made available to the public until Burdell’s death, but there is a freely accessible summary of the interview. In his interview, Burdell shares that in his early life, he went to Joseph Lamar Elementary School, and then got his secondary education at Richmond Academy. In 2002, some researchers at Tech who were friends with Burdell discovered a way to alter one of his chromosomes so that his body would no longer age. The researchers successfully made Burdell immortal, but they destroyed their work shortly after. Burdell said that he plans to continue to spend his life working to further improve Georgia Tech’s reputation.", icon: "grave.png", image: "" },
  { title: "George P Burdell Philantrhopy",  text: "A well in Africa is humorously attributed to George P. Burdell, adding an international achievement to his already extensive legacy. Despite being a fictional figure, Burdell is credited with helping provide access to clean water for an African community. This playful attribution extends Georgia Tech's long-running tradition of celebrating Burdell's accomplishments, blurring the line between campus legend and reality.", icon: "money.png", image: "well.jpg" },
  { title: "Burdell In the Band",   text: "George P. Burdell is part of the Georgia Tech Yellow Jacket Marching Band, though he works from the shadows. Burdell is in charge of running the band staff assistants’ email, gtbandstaffassistants@gmail.com. Typically, if there is a mistake with taking attendance during marching band, band students will send Burdell an email. Once Burdell sees the email, he goes into Canvas and fixes their attendance for them.", icon: "marching.png", image: "" },
{ title: "Georgia P. Burdell",  text: "Recently, more information has surfaced regarding George P. Burdell’s family. Georgia Tech physics professor Dr. Emily Alicea-Munoz saw “Georgia P. Burdell” burn her mouth while trying to drink coffee, and decided it would make for a great practice problem to use in a lecture. This sparked much curiosity among students, as no one had ever heard of Georgia P. Burdell before. The professor revealed to the class that Georgia is the name of George’s twin sister. Previously, it was thought that George P. Burdell had no living biological relatives. Seeing as Georgia was able to hide from the world for nearly a century, elusiveness may run in the family. Perhaps George has more unheard-of relatives who have yet to be found. We may never know.", icon: "woman.png", image: "georgia.png" },
{ title: "Report a Burdell Sighting",  text: "Have you ever spotted George P. Burdell around campus or had a class with him? Do you want to share your Burdell story? If so, the Georgia Tech Alumni Association has a website where you can report a Burdell sighting. On the website, there are also stories from a few former students about places they have seen Burdell.", icon: "megaphone.png", image: "sighting.png" },
{ title: "Where is he now?",  text: "Unifies students", icon: "man.png", image: "" },
];

/* ---------------------------------------------------------
   SOURCES (shown on sources.html)
   title : name of the book, article, or page
   by    : author or publication
   year  : (optional)
   url   : (optional) link, must start with http:// or https://
   note  : (optional) what you used it for
   --------------------------------------------------------- */
var SOURCES = [
  { title: "Title", by: "Author", year: "2000", url: "https://example.com", note: "Notes" }
];

/* ---------------------------------------------------------
   SIDE-COLUMN COMICS
   Listed images repeat down the left and right margins.
   The first half go on the left, the second half on the right.
   --------------------------------------------------------- */
var COMICS = [
  { src: "comic1.png", cap: "Figure 1" },
  { src: "comic2.png", cap: "Figure 2" },
  { src: "comic3.png", cap: "Figure 3" },
  { src: "comic4.png", cap: "Figure 4" },
  { src: "comic5.png", cap: "Figure 5" },
  { src: "comic6.png", cap: "Figure 6" }
];
