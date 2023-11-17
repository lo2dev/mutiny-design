import Gio from "gi://Gio";

const server_banner = workbench.builder.get_object("server_banner");

const server_banner_source = Gio.File.new_for_uri(
  workbench.resolve("./tim.png"),
);

server_banner.file = server_banner_source;





