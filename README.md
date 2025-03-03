# StreamFlix
Movie/TV Show/Anime streaming website.

#How to add your movie/tv show/anime

Your contributions will be merged with the main branch if you add good content! Enjoy!

  1. Open data.js
  2. Find your type (movie,tv show or anime)
  3. Add Movie:
        `  {
          id: 'movie6',
          title: 'Title',
          year: ----,
          rating: 'PG-??',
          duration: '-h --m',
          description: '...',
          poster: 'Poster Link (copy image url from google or smt)',
          src: 'File Link (Google Drive Embed Preview or WebArchive Embed)'
      }`
     PS: If it doesn't work maybe you missed the "," after the last curly bracket on the previous movie.
4. Add TV Show/Anime:
    `id: 'tvshow2',
          title: 'Show Title',
          year: '????-????',
          rating: 'TV-??',
          duration: '? Seasons',
          description: '...',
          poster: 'Poster Link (You can copy picture link of something found on google)',
          seasons: [
              {
                  season: 1,
                  episodes: [
                      {
                          episode: 1,
                          title: 'Shadows Rising',
                          src: 'https://example.com/videos/shadow-s01e01.mp4'
                      }
                  ]
              },        
          ]
      },`
   Note: Add episodes by adding:
   `
   #Previous ep just added the comma >},
   {
     episode: ?
     title: 'ep title'
     src: 'vid link (Google Drive/WebArchive embed preview link (soon to support more))'
   }
   `
  Note: Add seasons by adding:
                                          
`  seasons: [
      {
         season: #
         episodes: [
              {
               //Add your episode here from the episode Note ^
               }
       } //Here ends season # to add the new one just add the come on this curly bracket on this line and on a new line open new curly brackets and start typing the same thing from line 53 to 57 and just close brackets again
   ]
`

Hope you understood 'cause I am not good at explaining! I'll keep adding whatever I find in random google drives and upload in mine too.
