export class Movie {
  public Title: string;
  public Year: string;
  public Runtime: number;
  public Genre: string;
  public Plot: string;
  public Metascore: string;
  public imdbRating: string;
  public imagePath: string;

  constructor(
    Title: string,
    Year: string,
    Runtime: number,
    Genre: string,
    Plot: string,
    Metascore: string,
    imdbRating: string,
    imagePath: string
  ) {
    this.Title = Title;
    this.Year = Year;
    this.Runtime = Runtime;
    this.Genre = Genre;
    this.Plot = Plot;
    this.Metascore = Metascore;
    this.imdbRating = imdbRating;
    this.imagePath = imagePath;
  }
}
