// Define field type strings used in column config
export enum FieldType {
  // TEXT
  shortText = "SIMPLE_TEXT",
  longText = "LONG_TEXT",
  richText = "RICH_TEXT",
  email = "EMAIL",
  phone = "PHONE_NUMBER",
  url = "URL",
  // SELECT
  singleSelect = "SINGLE_SELECT",
  multiSelect = "MULTI_SELECT",
  // NUMERIC
  checkbox = "CHECK_BOX",
  number = "NUMBER",
  percentage = "PERCENTAGE",
  rating = "RATING",
  slider = "SLIDER",
  color = "COLOR",
  // DATE & TIME
  date = "DATE",
  dateTime = "DATE_TIME",
  duration = "DURATION",
  // FILE
  image = "IMAGE",
  file = "FILE",
  // CONNECTION
  subTable = "SUB_TABLE",
  connectTable = "DOCUMENT_SELECT",
  connectService = "SERVICE_SELECT",
  // CODE
  json = "JSON",
  code = "CODE",
  // CLOUD FUNCTION
  action = "ACTION",
  derivative = "DERIVATIVE",
  aggregate = "AGGREGATE",
  status = "STATUS",
  // METADATA
  user = "USER",
  id = "ID",
  last = "LAST",
  // USER ADDED
  list = "LIST",
}
