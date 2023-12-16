import { Command } from "@tauri-apps/api/shell";
import "./App.css";
const htops = async () => {
  const command = new Command("update");
  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`
    );
  });
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => console.log(`command stdout: "${line}"`));
  command.stderr.on("data", (line) => console.log(`command stderr: "${line}"`));
  await command.execute();
};
function App() {
  return (
    <>
      <h1>Relapse</h1>
      <div className="card">
        <button onClick={htops}>update</button>
      </div>
    </>
  );
}

export default App;
