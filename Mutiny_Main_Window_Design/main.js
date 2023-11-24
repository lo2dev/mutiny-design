import Gio from "gi://Gio";
import { gettext as _ } from "gettext";
import Adw from "gi://Adw";
import Gtk from "gi://Gtk";

const channels_list_view = workbench.builder.get_object("channels_list_view");

//Model
const channel_string_model = new Gtk.StringList({
  strings: ["Channel 1", "Channel 2", "Channel 3"],
});

const channel_model = new Gtk.SingleSelection({ model: channel_string_model });

//View
channel_model.connect("selection-changed", () => {
  const selected_item = model.get_selected();
  console.log(
    `Model item selected from view: ${channel_model.model.get_string(
      selected_item,
    )}`,
  );
});

channels_list_view.model = channel_model;

const servers_list_view = workbench.builder.get_object("servers_list_view");

const server_string_model = new Gtk.StringList({
  strings: [
    "The Six Seas (the 7th was banned)",
    "deez",
    "Mission Hee Hee",
    "Unofficial Clients",
    "m",
    "Revolt Team",
    "Mutiny",
  ],
});

const server_model = new Gtk.SingleSelection({ model: server_string_model });

servers_list_view.model = server_model;

const server_banner = workbench.builder.get_object("server_banner");

const server_banner_source = Gio.File.new_for_uri(
  workbench.resolve("./tim.png"),
);

server_banner.file = server_banner_source;

const parent = workbench.builder.get_object("MutinyWindow");
const button = workbench.builder.get_object("preferences_menu_button");

function openAboutWindow() {
  const dialog = new Adw.AboutWindow({
    transient_for: parent,
    application_icon: "application-x-executable",
    application_name: "Mutiny",
    developer_name: "Loki Calmito",
    version: "0.0.0",
    issue_url: "https://github.com/revoltchat/mutiny/issues",
    copyright: "© 2023 Loki Calmito",
    license_type: Gtk.License.GPL_3_0_ONLY,
    translator_credits: _("translator-credits"),
  });

  dialog.add_acknowledgement_section(_("Special thanks to"), [_("Workbench")]);

  dialog.present();
}

button.connect("clicked", openAboutWindow);

const { application, builder } = workbench;

const notification = new Gio.Notification();

notification.set_title("Tim Sweeny");
notification.set_body("epic");

notification.set_default_action("app.notification-reply");
notification.add_button("Reply", "app.notification-reply");
notification.add_button("Mark as Read", "app.notification-mark-as-read");
notification.add_button("Do Not Disturb", "app.notification-turn-on-dnd");

//const icon = new Gio.FileIcon(builder.resolve("./tim.png"));

//const file = Gio.Theme(workbench.resolve("./tim.png"));
const icon = new Gio.ThemedIcon({ name: "gamepad-symbolic" });
notification.set_icon(icon);

builder.get_object("add_attachments_button").connect("clicked", () => {
  application.send_notification("lunch-is-ready", notification);
});

