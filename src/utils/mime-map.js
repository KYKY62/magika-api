/**
 * Maps Magika content type labels to MIME types, groups, and descriptions.
 * The Magika JS library only returns { label, is_text } — this map enriches
 * the response with useful metadata for API consumers.
 */

const MIME_MAP = {
  "3gp": { mime: "video/3gpp", group: "video", desc: "3GP video" },
  ai: { mime: "application/postscript", group: "document", desc: "Adobe Illustrator" },
  apk: { mime: "application/vnd.android.package-archive", group: "archive", desc: "Android APK" },
  asm: { mime: "text/x-asm", group: "code", desc: "Assembly source" },
  asp: { mime: "text/html", group: "code", desc: "ASP source" },
  avi: { mime: "video/x-msvideo", group: "video", desc: "AVI video" },
  batch: { mime: "text/x-msdos-batch", group: "code", desc: "Windows batch script" },
  bmp: { mime: "image/bmp", group: "image", desc: "BMP image" },
  bzip: { mime: "application/x-bzip2", group: "archive", desc: "Bzip2 archive" },
  c: { mime: "text/x-c", group: "code", desc: "C source" },
  cpp: { mime: "text/x-c++src", group: "code", desc: "C++ source" },
  cs: { mime: "text/x-csharp", group: "code", desc: "C# source" },
  css: { mime: "text/css", group: "code", desc: "CSS stylesheet" },
  csv: { mime: "text/csv", group: "data", desc: "CSV data" },
  dart: { mime: "text/x-dart", group: "code", desc: "Dart source" },
  deb: { mime: "application/x-debian-package", group: "archive", desc: "Debian package" },
  diff: { mime: "text/x-diff", group: "text", desc: "Diff/patch file" },
  dll: { mime: "application/x-msdownload", group: "executable", desc: "Windows DLL" },
  doc: { mime: "application/msword", group: "document", desc: "MS Word document" },
  dockerfile: { mime: "text/x-dockerfile", group: "code", desc: "Dockerfile" },
  docx: { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", group: "document", desc: "MS Word document (OOXML)" },
  elf: { mime: "application/x-elf", group: "executable", desc: "ELF binary" },
  eml: { mime: "message/rfc822", group: "text", desc: "Email message" },
  empty: { mime: "application/x-empty", group: "other", desc: "Empty file" },
  epub: { mime: "application/epub+zip", group: "document", desc: "EPUB ebook" },
  exe: { mime: "application/x-dosexec", group: "executable", desc: "Windows executable" },
  flac: { mime: "audio/flac", group: "audio", desc: "FLAC audio" },
  gif: { mime: "image/gif", group: "image", desc: "GIF image" },
  go: { mime: "text/x-go", group: "code", desc: "Go source" },
  gzip: { mime: "application/gzip", group: "archive", desc: "Gzip archive" },
  h: { mime: "text/x-c", group: "code", desc: "C/C++ header" },
  haskell: { mime: "text/x-haskell", group: "code", desc: "Haskell source" },
  html: { mime: "text/html", group: "code", desc: "HTML document" },
  ico: { mime: "image/x-icon", group: "image", desc: "ICO icon" },
  ini: { mime: "text/plain", group: "config", desc: "INI config" },
  iso: { mime: "application/x-iso9660-image", group: "archive", desc: "ISO disk image" },
  jar: { mime: "application/java-archive", group: "archive", desc: "Java JAR" },
  java: { mime: "text/x-java", group: "code", desc: "Java source" },
  javascript: { mime: "text/javascript", group: "code", desc: "JavaScript source" },
  jpeg: { mime: "image/jpeg", group: "image", desc: "JPEG image" },
  json: { mime: "application/json", group: "data", desc: "JSON data" },
  jsonl: { mime: "application/jsonlines", group: "data", desc: "JSON Lines" },
  kotlin: { mime: "text/x-kotlin", group: "code", desc: "Kotlin source" },
  latex: { mime: "text/x-latex", group: "text", desc: "LaTeX document" },
  lua: { mime: "text/x-lua", group: "code", desc: "Lua source" },
  makefile: { mime: "text/x-makefile", group: "code", desc: "Makefile" },
  markdown: { mime: "text/markdown", group: "text", desc: "Markdown document" },
  midi: { mime: "audio/midi", group: "audio", desc: "MIDI audio" },
  mkv: { mime: "video/x-matroska", group: "video", desc: "Matroska video" },
  mp3: { mime: "audio/mpeg", group: "audio", desc: "MP3 audio" },
  mp4: { mime: "video/mp4", group: "video", desc: "MP4 video" },
  msi: { mime: "application/x-msi", group: "executable", desc: "Windows installer" },
  pdf: { mime: "application/pdf", group: "document", desc: "PDF document" },
  pebin: { mime: "application/vnd.microsoft.portable-executable", group: "executable", desc: "PE binary" },
  pem: { mime: "application/x-pem-file", group: "security", desc: "PEM certificate" },
  perl: { mime: "text/x-perl", group: "code", desc: "Perl source" },
  php: { mime: "text/x-php", group: "code", desc: "PHP source" },
  png: { mime: "image/png", group: "image", desc: "PNG image" },
  postscript: { mime: "application/postscript", group: "document", desc: "PostScript" },
  powershell: { mime: "text/x-powershell", group: "code", desc: "PowerShell script" },
  ppt: { mime: "application/vnd.ms-powerpoint", group: "document", desc: "MS PowerPoint" },
  pptx: { mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation", group: "document", desc: "MS PowerPoint (OOXML)" },
  python: { mime: "text/x-python", group: "code", desc: "Python source" },
  rar: { mime: "application/x-rar-compressed", group: "archive", desc: "RAR archive" },
  rst: { mime: "text/x-rst", group: "text", desc: "reStructuredText" },
  rtf: { mime: "application/rtf", group: "document", desc: "Rich Text Format" },
  ruby: { mime: "text/x-ruby", group: "code", desc: "Ruby source" },
  rust: { mime: "text/x-rust", group: "code", desc: "Rust source" },
  scala: { mime: "text/x-scala", group: "code", desc: "Scala source" },
  shell: { mime: "text/x-shellscript", group: "code", desc: "Shell script" },
  sql: { mime: "text/x-sql", group: "code", desc: "SQL script" },
  sqlite: { mime: "application/x-sqlite3", group: "data", desc: "SQLite database" },
  svg: { mime: "image/svg+xml", group: "image", desc: "SVG image" },
  swift: { mime: "text/x-swift", group: "code", desc: "Swift source" },
  tar: { mime: "application/x-tar", group: "archive", desc: "TAR archive" },
  tiff: { mime: "image/tiff", group: "image", desc: "TIFF image" },
  toml: { mime: "application/toml", group: "config", desc: "TOML config" },
  tsv: { mime: "text/tab-separated-values", group: "data", desc: "TSV data" },
  txt: { mime: "text/plain", group: "text", desc: "Plain text" },
  typescript: { mime: "text/typescript", group: "code", desc: "TypeScript source" },
  unknown: { mime: "application/octet-stream", group: "unknown", desc: "Unknown binary" },
  wav: { mime: "audio/wav", group: "audio", desc: "WAV audio" },
  webm: { mime: "video/webm", group: "video", desc: "WebM video" },
  webp: { mime: "image/webp", group: "image", desc: "WebP image" },
  xls: { mime: "application/vnd.ms-excel", group: "document", desc: "MS Excel" },
  xlsx: { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", group: "document", desc: "MS Excel (OOXML)" },
  xml: { mime: "application/xml", group: "data", desc: "XML document" },
  xz: { mime: "application/x-xz", group: "archive", desc: "XZ archive" },
  yaml: { mime: "text/yaml", group: "config", desc: "YAML document" },
  zip: { mime: "application/zip", group: "archive", desc: "ZIP archive" },
  zstd: { mime: "application/zstd", group: "archive", desc: "Zstandard archive" },
};

/**
 * Enrich a Magika prediction result with MIME type, group, and description.
 * @param {object} result - Raw Magika result { path, status, prediction }
 * @returns {object} Clean detection object
 */
export function formatPrediction(result) {
  const output = result.prediction?.output || {};
  const label = output.label || "unknown";
  const isText = output.is_text ?? false;
  const score = result.prediction?.score ?? 0;

  const meta = MIME_MAP[label] || {
    mime: isText ? "text/plain" : "application/octet-stream",
    group: isText ? "text" : "unknown",
    desc: label.charAt(0).toUpperCase() + label.slice(1),
  };

  return {
    label,
    mime_type: meta.mime,
    group: meta.group,
    description: meta.desc,
    is_text: isText,
    score: Math.round(score * 10000) / 10000, // 4 decimal places
  };
}
