// This file contains sample data for the streaming website
// In a real implementation, this data would come from a server/database

const mediaData = {
  movies: [
      {
          id: 'movie1',
          title: 'Cars',
          year: 2006,
          rating: 'G',
          duration: '1h 57m',
          description: 'On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town and learns that winning isn`t everything in life.',
          poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p159400_p_v12_ai.jpg',
          src: 'https://drive.google.com/file/d/1FX8PrjPbJqKjlOyOaNQ6G0GB5opOkzzC/preview'
      },
      {
          id: 'movie2',
          title: 'Cars',
          year: 2011,
          rating: 'G',
          duration: '1h 46m',
          description: 'Star race car Lightning McQueen and his pal Mater head overseas to compete in the World Grand Prix race. But the road to the championship becomes rocky as Mater gets caught up in an intriguing adventure of his own: international espionage.',
          poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8367177_p_v13_aq.jpg',
          src: 'https://drive.google.com/file/d/1GhFcV3US6al54vaSqpghCr-8ah1C22sI/preview'
      },
      {
          id: 'movie3',
          title: 'Cars 3',
          year: 2017,
          rating: 'G',
          duration: '1h 49m',
          description: 'Lightning McQueen sets out to prove to a new generation of racers that he`s still the best race car in the world.',
          poster: 'https://images.moviesanywhere.com/890fbf2b0a670dae45c01a009fb2fc1e/4c3e2e4c-da15-4b21-be58-a1c7645a9db9.jpg',
          src: 'https://drive.google.com/file/d/10bkZ_Zjqy9pS07h9N1fL9YcWixb_l-wa/preview'
      },
      {
          id: 'movie4',
          title: 'Lego Ninjago The Movie',
          year: 2017,
          rating: 'PG-Y7',
          duration: '1h 41m',
          description: 'Shunned by everyone for being the son of an evil warlord, a teenager seeks to defeat him with the help of his fellow ninjas.',
          poster: 'https://m.media-amazon.com/images/M/MV5BNWQ3Zjk0ZGEtOTU4ZS00OWY1LTlkM2YtNTllZjBhNTk3NDAxXkEyXkFqcGc@._V1_.jpg',
          src: 'https://drive.google.com/file/d/13SeF4UJPg6swpdpmnHUlilGU9UZQrHQe/preview'
      },
      {
          id: 'movie5',
          title: 'Ninjago: Day Of The Departed',
          year: 2017,
          rating: 'G',
          duration: '44m',
          description: 'The Ninja are celebrating "day of the departed" a national holiday in Ninjago. But when sensei yang brings back past villians and promises them that they can live again if they defeat the ninja, are they ready for this threat?',
          poster: 'https://m.media-amazon.com/images/S/pv-target-images/1da1ca99165d3aa9d7e091dd15c574cbe02439c4caf5825a55ffa0ac617b30e0.jpg',
          src: 'https://archive.org/embed/day-of-the-departed'
      },
      {
          id: 'movie6',
          title: 'Rise of the Machines',
          year: 2024,
          rating: 'PG-13',
          duration: '2h 5m',
          description: 'When artificial intelligence evolves beyond human control, a small group of engineers must race against time to prevent global catastrophe.',
          poster: '/api/placeholder/200/300',
          src: 'https://example.com/videos/rise-of-the-machines.mp4' // Placeholder URL
      }
  ],
  tvshows: [
      {
          id: 'tvshow1',
          title: 'Ninjago',
          year: '2011-2024',
          rating: 'TV-Y7',
          duration: '4 Seasons',
          description: 'When the fate of their world, Ninjago, is challenged by great threats, it`s up to the Ninja: Kai, Jay, Cole, Zane, Lloyd and Nya to save the world.',
          poster: 'C:/Users/D_D/Documents/My Web Sites/AI Testing/Posters/Ninjago.jpg',
          seasons: [
              {
                  season: 0,
                  episodes: [
                      {
                          episode: 1,
                          title: 'Way of the Ninja',
                          src: 'D:/Movies/Shows/Ninjago/S0E1.mp4'
                      },
                      {
                          episode: 2,
                          title: 'The Discovery',
                          src: 'https://drive.google.com/file/d/17ONM4Vme3iSi4cVrNW2_2oOqhPxc3Sps/preview'
                      }
                  ]
              },
              {
                  season: 1,
                  episodes: [
                      {
                          episode: 1,
                          title: 'Rise of the Snakes',
                          src: 'https://example.com/videos/chronicles-s02e01.mp4' // Placeholder URL
                      },
                      {
                          episode: 2,
                          title: 'Home',
                          src: 'https://example.com/videos/chronicles-s02e02.mp4' // Placeholder URL
                      },
                      {
                          episode: 3,
                          title: 'Snakebit',
                          src: 'https://example.com/videos/chronicles-s02e03.mp4' // Placeholder URL
                      }
                  ]
              }
          ]
      },
      {
          id: 'tvshow2',
          title: 'Shadow Detectives',
          year: '2022-2024',
          rating: 'TV-14',
          duration: '3 Seasons',
          description: 'A team of detectives with supernatural abilities solves crimes that have paranormal elements, while hiding their powers from the world.',
          poster: '/api/placeholder/200/300',
          seasons: [
              {
                  season: 1,
                  episodes: [
                      {
                          episode: 1,
                          title: 'Shadows Rising',
                          src: 'https://example.com/videos/shadow-s01e01.mp4' // Placeholder URL
                      },
                      {
                          episode: 2,
                          title: 'The Medium',
                          src: 'https://example.com/videos/shadow-s01e02.mp4' // Placeholder URL
                      },
                      {
                          episode: 3,
                          title: 'Dark Forces',
                          src: 'https://example.com/videos/shadow-s01e03.mp4' // Placeholder URL
                      }
                  ]
              },
              {
                  season: 2,
                  episodes: [
                      {
                          episode: 1,
                          title: 'New Recruits',
                          src: 'https://example.com/videos/shadow-s02e01.mp4' // Placeholder URL
                      },
                      {
                          episode: 2,
                          title: 'The Haunting',
                          src: 'https://example.com/videos/shadow-s02e02.mp4' // Placeholder URL
                      },
                      {
                          episode: 3,
                          title: 'Ancient Rituals',
                          src: 'https://example.com/videos/shadow-s02e03.mp4' // Placeholder URL
                      }
                  ]
              }
          ]
      },
  ],
  anime: [
      {
          id: 'black-clover',
          title: 'Black Clover',
          year: '2021-2023',
          rating: 'TV-14',
          duration: '1 Season',
          description: 'In a world where people can manifest their spirit energy as weapons, a young orphan discovers he has an exceptionally powerful spirit that attracts both allies and enemies.',
          poster: 'https://images-cdn.ubuy.co.id/634e3a07b02aa9569c406305-ouji-anime-poster-black-clover-poster.jpg',
          seasons: [
              {
                  season: 1,
                  episodes: [
                      {
                        episode: 1,
                        title: ' Asta and Yuno',
                        src: 'https://drive.google.com/file/d/1LOwfW3VWb9A-xaWfGq7tYi7CPrL7ubHF/preview'
                      },
                      {
                        episode: 2,
                        title: ' The Black Bulls',
                        src: 'https://drive.google.com/file/d/1svXSNxutYYQf2xjunVo4doIlTg4Ab8Mm/preview'
                      },
                      {
                          episode: 23,
                          title: 'Awakening',
                          src: 'D:/Movies/Shows/Black Clover/BlackClover23.mp4'
                      },
                      {
                          episode: 24,
                          title: 'The First Battle',
                          src: 'D:/Movies/Shows/Black Clover/BlackClover24.mp4'
                      }
                      
                  ]
              }
          ]
      },

      {
          id: 'anime2',
          title: 'Cyber Samurai',
          year: '2022-2024',
          rating: 'TV-MA',
          duration: '2 Seasons',
          description: 'In a cyberpunk future, a modern samurai with cybernetic enhancements battles corrupt corporations and criminal syndicates to protect the innocent.',
          poster: '/api/placeholder/200/300',
          seasons: [
              {
                  season: 1,
                  episodes: [
                      {
                          episode: 1,
                          title: 'The Way of the Blade',
                          src: 'https://example.com/videos/cyber-s01e01.mp4' // Placeholder URL
                      },
                      {
                          episode: 2,
                          title: 'Digital Demons',
                          src: 'https://example.com/videos/cyber-s01e02.mp4' // Placeholder URL
                      },
                      {
                          episode: 3,
                          title: 'The Upgrade',
                          src: 'https://example.com/videos/cyber-s01e03.mp4' // Placeholder URL
                      }
                  ]
              },
              {
                  season: 2,
                  episodes: [
                      {
                          episode: 1,
                          title: 'System Reboot',
                          src: 'https://example.com/videos/cyber-s02e01.mp4' // Placeholder URL
                      },
                      {
                          episode: 2,
                          title: 'The Resistance',
                          src: 'https://example.com/videos/cyber-s02e02.mp4' // Placeholder URL
                      },
                      {
                          episode: 3,
                          title: 'Ghost in the Machine',
                          src: 'https://example.com/videos/cyber-s02e03.mp4' // Placeholder URL
                      }
                  ]
              }
          ]
      },
      {
          id: 'anime3',
          title: 'Magic Academy',
          year: '2020-2024',
          rating: 'TV-PG',
          duration: '4 Seasons',
          description: 'Students with various magical abilities attend an elite academy to learn to control their powers, facing challenges from rival schools and ancient magical threats.',
          poster: '/api/placeholder/200/300',
          seasons: [
              {
                  season: 1,
                  episodes: [
                      {
                          episode: 1,
                          title: 'The New Student',
                          src: 'https://example.com/videos/magic-s01e01.mp4' // Placeholder URL
                      },
                      {
                          episode: 2,
                          title: 'First Spell',
                          src: 'https://example.com/videos/magic-s01e02.mp4' // Placeholder URL
                      },
                      {
                          episode: 3,
                          title: 'The Forbidden Tome',
                          src: 'https://example.com/videos/magic-s01e03.mp4' // Placeholder URL
                      }
                  ]
              },
              {
                  season: 2,
                  episodes: [
                      {
                          episode: 1,
                          title: 'Summer Training',
                          src: 'https://example.com/videos/magic-s02e01.mp4' // Placeholder URL
                      },
                      {
                          episode: 2,
                          title: 'The Tournament',
                          src: 'https://example.com/videos/magic-s02e02.mp4' // Placeholder URL
                      },
                      {
                          episode: 3,
                          title: 'Ancient Powers',
                          src: 'https://example.com/videos/magic-s02e03.mp4' // Placeholder URL
                      }
                  ]
              }
          ]
      }
  ]
};