export class Movie {
  public Title: string;
  public Year: string;
  public Runtime: string;
  public Genre: string;
  public Plot: string;
  public Metascore: string;
  public imdbRating: string;

  constructor(
    Title: string,
    Year: string,
    Runtime: string,
    Genre: string,
    Plot: string,
    Metascore: string,
    imdbRating: string
  ) {
    this.Title = Title;
    this.Year = Year;
    this.Runtime = Runtime;
    this.Genre = Genre;
    this.Plot = Plot;
    this.Metascore = Metascore;
    this.imdbRating = imdbRating;
  }
}
