export interface BusquedaTenor {
  results: Result[];
  next:    string;
}

export interface Result {
  id:                         string;
  title:                      string;
  media_formats:              { [key: string]: MediaFormat };
  created:                    number;
  content_description:        string;
  itemurl:                    string;
  url:                        string;
  tags:                       string[];
  flags:                      string[];
  hasaudio:                   boolean;
  content_description_source: string;
}

export interface MediaFormat {
  url:      string;
  duration: number;
  preview:  string;
  dims:     number[];
  size:     number;
}
