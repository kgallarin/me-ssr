type FaIconSingle = string[];

export interface FontAwesomeIconObject {
  icon: FaIconSingle;
  color: string;
}

export interface IconLink {
  id: string;
  name: string;
  url: string;
  icon: FaIconSingle;
  classColor: string;
}

export interface IconLinksPayload {
  iconLinks: IconLink[];
}
