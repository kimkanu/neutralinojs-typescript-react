export {};

declare type Integer = number;

declare global {
  /**
   * Operating system name: Linux, Windows, or macOS
   */
  export const NL_OS: string;

  /**
   * Application identifier
   */
  export const NL_APPID: string;

  /**
   * Application port
   */
  export const NL_PORT: string;

  /**
   * Mode of the application: window, browser, or cloud
   */
  export const NL_MODE: string;

  /**
   * Neutralinojs server version
   */
  export const NL_VERSION: string;

  /**
   * Neutralinojs client version
   */
  export const NL_CVERSION: string;

  /**
   * Current working directory
   */
  export const NL_CWD: string;

  /**
   * Application path
   */
  export const NL_PATH: string;

  /**
   * Command-line arguments
   */
  export const NL_ARGS: string;

  /**
   * Initializes the app.
   */
  namespace Neutralino {
    export function init(): void;
  }

  /**
   * `Neutralino.app` namespace contains methods related to the current
   * application instance.
   */
  namespace Neutralino.app {
    /**
     * Terminates the running application.
     */
    export function exit(): Promise<void>;

    /**
     * The keepAlive method is responsible for saving the Neutralinojs server
     * instance from the automatic termination. This method is called
     * automatically from the client library for the browser mode.
     */
    export function keepAlive(): Promise<void>;

    /**
     * Returns the current application configuration as a JSON object.
     */
    export function getConfig(): Promise<object>;

    /**
     * Opens a URL with the default web browser.
     *
     * If your application is running the default web browser, this method will
     * open a new tab.
     *
     * @param {OpenActionOptions} options
     */
    export function open(options: OpenActionOptions): Promise<object>;
    export interface OpenActionOptions {
      /**
       * url: URL to be opened (required).
       */
      url: string;
    }
  }

  /**
   * `Neutralino.window` namespace contains methods related to the current
   * native window instance. This namespace's methods will work only for the
   * `window` mode.
   */
  namespace Neutralino.window {
    /**
     * Sets the title of the native window.
     * @param {string} title Title of the window as a string.
     */
    export function setTitle(title: string): Promise<void>;

    /**
     * Minimizes the native window.
     */
    export function minimize(): Promise<void>;

    /**
     * Maximizes the native window.
     */
    export function maximize(): Promise<void>;

    /**
     * Restores the native window.
     */
    export function unmaximize(): Promise<void>;

    /**
     * Returns `true` if the native window is maximized.
     */
    export function isMaximized(): Promise<boolean>;

    /**
     * Enables the full screen mode.
     */
    export function setFullScreen(): Promise<void>;

    /**
     * Exits from the full screen mode.
     */
    export function exitFullScreen(): Promise<void>;

    /**
     * Returns `true` if the native window is in the full screen mode.
     */
    export function isFullScreen(): Promise<boolean>;

    /**
     * Shows the native window.
     */
    export function show(): Promise<void>;

    /**
     * Hides the native window.
     */
    export function hide(): Promise<void>;

    /**
     * Returns `true` if the native window is visible.
     */
    export function isVisible(): Promise<boolean>;

    /**
     * Focuses the native window.
     */
    export function focus(): Promise<void>;

    /**
     * Moves the native window into given coordinates. Neutralinojs's cross-
     * platform coordinate system starts from top-left corner of the screen.
     * In other words, `x = 0, y = 0` point refers to the top-left corner of the
     * device's main screen.
     * @param {Integer} x An integer value for the horizontal position.
     * @param {Integer} y An integer value for the vertical position.
     */
    export function move(x: Integer, y: Integer): Promise<void>;

    /**
     * Sets an icon for the native window or Dock.
     * @param {string} icon Path of the icon. A `200x200` PNG image file works
     *                      fine on all supported operating systems.
     */
    export function setIcon(icon: string): Promise<void>;

    /**
     * Converts a give DOM element to a draggable region. The user will be able
     * to drag the native window by dragging the given DOM element. This feature
     * is suitable to make custom window bars along with the borderless mode.
     * (https://neutralino.js.org/docs/configuration/neutralino.config.json/#modeswindowborderless-boolean)
     * @param {string} domId A DOM element identifier as a string.
     */
    export function setDraggableRegion(domId: string): Promise<void>;
  }

  /**
   * `Neutralino.filesystem` namespace contains methods for handling files.
   */
  namespace Neutralino.filesystem {
    /**
     * Creates a new directory.
     * @param {CreateDirectoryOptions} options
     */
    export function createDirectory(options: CreateDirectoryOptions): Promise<void>;
    export interface CreateDirectoryOptions {
      /**
       * path: New directory path.
       */
      path: string;
    }

    /**
     * Removes given directories.
     * @param {RemoveDirectoryOptions} options
     */
    export function removeDirectory(
      options: RemoveDirectoryOptions,
    ): Promise<void>;
    export interface RemoveDirectoryOptions {
      /**
       * path: Directory path.
       */
      path: string;
    }

    /**
     * Writes new files with data.
     * @param {WriteFileOptions} options
     */
    export function writeFile(options: WriteFileOptions): Promise<void>;
    export interface WriteFileOptions {
      /**
       * fileName: File name.
       */
      fileName: string;

      /**
       * data: Content of the file in string format.
       */
      data: string;
    }

    /**
     * Reads files contains text data.
     * @param {ReadFileOptions} options
     */
    export function readFile(options: ReadFileOptions): Promise<void>;
    export interface ReadFileOptions {
      /**
       * fileName: File name.
       */
      fileName: string;
    }
    export interface ReadFileResponse {
      /**
       * data: File content.
       */
      data: string;
      hasError: false;
    }

    /**
     * Removes given file.
     * @param {RemoveFileOptions} options
     */
    export function removeFile(options: RemoveFileOptions): Promise<void>;
    export interface RemoveFileOptions {
      /**
       * fileName: File name.
       */
      fileName: string;
    }

    /**
     * Reads a whole directory.
     * @param {ReadDirectoryOptions} options
     */
    export function readDirectory(
      options: ReadDirectoryOptions,
    ): Promise<ReadDirectoryResponse>;
    export interface ReadDirectoryOptions {
      /**
       * path: File name.
       */
      path: string;
    }
    export interface ReadDirectoryResponse {
      entries: ReadDirectoryResponseEntry[];
      success: true;
    }
    export interface ReadDirectoryResponseEntry {
      entry: string;
      type: 'FILE' | 'DIRECTORY';
    }
  }

  /**
   * `Neutralino.os` namespace contains methods related to the user's operating
   * system.
   */
  namespace Neutralino.os {
    /**
     * Executes a command and returns the output.
     * @param {ExecCommandOptions} options
     */
    export function execCommand(
      options: ExecCommandOptions,
    ): Promise<ExecCommandResponse>;
    export interface ExecCommandOptions {
      /**
       * command: The command needs to be executed.
       */
      command: string;
    }
    export interface ExecCommandResponse {
      /**
       * output: String data taken from the both standard output (STDOUT) and
       *         standard error (STDERR) streams of the command's process.
       */
      output: string;
    }

    /**
     * Provides the value of a given environment variable.
     * @param {GetEnvarOptions} options
     */
    export function getEnvar(options: GetEnvarOptions): Promise<GetEnvarResponse>;
    export interface GetEnvarOptions {
      /**
       * key: The name of the environment variable.
       */
      key: string;
    }
    export interface GetEnvarResponse {
      /**
       * value: Value of the given environment variable.
       */
      value: string;
    }

    /**
     * Shows the file open dialog.
     * @param {DialogOpenOptions} options
     */
    export function showDialogOpen(
      options: DialogOpenOptions,
    ): Promise<DialogOpenResponse>;
    export interface DialogOpenOptions {
      /**
       * title: Title of the dialog.
       */
      title: string;

      /**
       * isDirectoryMode: A boolean value to allow directories to be selected.
       *                  The default value is `false`.
       */
      isDirectoryMode?: boolean;

      /**
       * filter: An array of file extensions to filter the file list.
       *         Eg: `filter: ['js', 'ts', '*']`.
       */
      filter: string[];
    }
    export interface DialogOpenResponse {
      /**
       * selectedEntry: The selected value (a folder or directory).
       */
      selectedEntry: string;
    }

    /**
     * Shows the file save dialog.
     * @param {DialogSaveOptions} options
     */
    export function showDialogSave(
      options: DialogSaveOptions,
    ): Promise<DialogSaveResponse>;
    export interface DialogSaveOptions {
      /**
       * title: Title of the dialog.
       */
      title: string;
    }
    export interface DialogSaveResponse {
      /**
       * selectedEntry: The selected value (a folder or directory).
       */
      selectedEntry: string;
    }

    /**
     * Displays a notification message.
     * @param {NotificationOptions} options
     */
    export function showNotification(
      options: NotificationOptions,
    ): Promise<void>;
    export interface NotificationOptions {
      /**
       * summary: Caption of the notification message.
       */
      summary: string;

      /**
       * body: Content of the notification.
       */
      body: string;
    }

    /**
     * Displays a message box.
     * @param {MessageBoxOptions} options
     */
    export function showMessageBox(
      options: MessageBoxOptions,
    ): Promise<MessageBoxResponse>;
    export interface MessageBoxOptions {
      /**
       * title: Title of the message box.
       */
      title: string;

      /**
       * content: Content of the message box.
       */
      content: string;

      /**
       * type: Message box type. Accepted values are `WARN`, `ERROR`, `INFO`,
       *       and `QUESTION`.
       */
      type: 'WARN' | 'ERROR' | 'INFO' | 'QUESTION';
    }
    export interface MessageBoxResponse {
      /**
       * yesButtonClicked: A boolean values to indentify whether `Yes` button
       *                   clicked in the `QUESTION` type messages.
       */
      yesButtonClicked: boolean;
    }

    /**
     * Creates/updates the tray icon and menu.
     * @param {TrayOptions} options
     */
    export function setTray(options: TrayOptions): Promise<void>;
    export interface TrayOptions {
      /**
       * icon: Tray icon path. Eg: `/resources/icons/trayIcon.png`.
       *       A `20x20`-sized PNG image file works fine on all supported
       *       operating systems.
       */
      icon: string;

      /**
       * menuItems: An array of `TrayMenuItem` objects.
       */
      menuItems: TrayMenuItem[];
    }
    export interface TrayMenuItem {
      /**
       * id: A unique identifier for each menu item.
       */
      id: string;

      /**
       * text: Label of the menu item. This field is a mandatory field. Use - (hyphen) character for a menu separator.
       */
      text: string;

      /**
       * isDisabled: A boolean flag to disable/enable a specific menu item.
       */
      isDisabled?: boolean;

      /**
       * isChecked: A boolean flag to mark a specific menu item as selected.
       */
      isChecked?: boolean;
    }
  }

  /**
   * `Neutralino.computer` namespace contains methods related to the user's
   * hardware.
   */
  namespace Neutralino.computer {
    /**
     * Provides physical memory details (in kilobytes).
     */
    export function getRamUsage(): Promise<GetRamUsageResponse>;
    export interface GetRamUsageResponse {
      ram: {
        total: Integer;
        available: Integer;
      }
      success: true
    }
  }

  /**
   * Neutralinojs has an in-built shared key-value storage. It's like a global
   * `LocalStorage` for all Neutralinojs modes. `Neutralinos.storage` exposes
   * methods for interacting with this storage feature.
   *
   * The storage API persists all data records into `.storage` directory in the
   * root directory of your application. If you want to clear all data records,
   * delete the `.storage` directory.
   */
  namespace Neutralino.storage {
    /**
     * Writes data into Neutralinojs shared storage.
     * @param {StorageWriterOptions} options
     */
    export function putData(options: StorageWriterOptions): Promise<void>;
    export interface StorageWriterOptions {
      /**
       * bucket: A key to indentify data.
       */
      bucket: string;

      /**
       * data: Data as a string. If this value is `null` or `undefined`,
       *       the specific data record will be erased from the disk.
       */
      data: string | null | undefined;
    }

    /**
     * Reads and returns data for a given Neutralinojs shared storage key.
     * Rejects when the bucket does not exist.
     * @param {StorageReaderOptions} options
     */
    export function getData(
      options: StorageReaderOptions,
    ): Promise<StorageReaderResponse>;
    export interface StorageReaderOptions {
      /**
       * bucket: The key of the storage data record.
       */
      bucket: string;
    }
    export interface StorageReaderResponse {
      /**
       * data: Data string of the storage record.
       */
      data: string;
    }
  }

  /**
   * `Neutralino.debug` namespace contains application debugging utilities.
   */
  namespace Neutralino.debug {
    export function log(options: LoggerOptions): Promise<void>;
    export interface LoggerOptions {
      /**
       * type: Type of the message. Accepted values are `INFO`, `WARN`, and
       *       `ERROR`.
       */
      type: 'INFO' | 'WARN' | 'ERROR';

      /**
       * message: Content to be logged.
       */
      message: string;
    }
  }

  /**
   * `Neutralino.events` namespace contains methods related to the native events
   * handling. These events are often initiated by the Neutralinojs server based
   * on native state changes.
   */
  namespace Neutralino.events {
    /**
     * Description: Occurs when the user clicks on a tray menu item.
     * Available modes: `window`
     */
    const TRAY_MENU_ITEM_CLICKED = 'trayMenuItemClicked';

    export type EventTypes = typeof TRAY_MENU_ITEM_CLICKED;

    export type EventDetail<T extends EventTypes> = T extends typeof TRAY_MENU_ITEM_CLICKED ? EventDetailTrayMenuItemClicked : never;
    export type EventDetailTrayMenuItemClicked = os.TrayMenuItem;

    export type EventHandler<T extends EventTypes> = (event: CustomEvent<EventDetail<T>>) => void;

    /**
     * Registers a new event handler.
     * @param {T}               eventName Name of the event.
     * @param {EventHandler<T>} handler   A function that will be called when
     *                                    the given event occurs. Neutralinojs
     *                                    will call the handler with a
     *                                    CustomEvent instance by attaching
     *                                    additional data to the detail key.
     */
    export function on<T extends EventTypes>(
      eventName: T,
      handler: EventHandler<T>,
    ): Promise<void>;

    /**
     * Unregisters an event handler.
     * @param {T}               eventName Name of the event.
     * @param {EventHandler<T>} handler   A function reference.
     */
    export function off<T extends EventTypes>(
      eventName: T,
      handler: EventHandler<T>,
    ): Promise<void>;

    /**
     * Dispatches a new event. Neutralinojs server uses this JavaScript function
     * call internally with native events.
     * @param {T}              eventName Name of the event.
     * @param {EventDetail<T>} data      Additional data for the event.
     */
    export function dispatch<T extends EventTypes>(
      eventName: T,
      data: EventDetail<T>,
    ): Promise<void>;
  }
}
