const search = document.getElementById("search");
const list = document.getElementById("list");

// カタカナ → ひらがな変換
function toHiragana(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

// ファイル名生成
function toFileName(name) {
  return name
  .toLowerCase()
  .replace(/^the\s+/i,"")
  .replace(/[^a-z0-9]/g, "");
}

// データ生成（ここ重要）
const data = bands.map(band => ({
  ...band,
  file: toFileName(band.name) + ".html"
}));

// 表示関数
function displayBands(arr) {
  list.innerHTML = "";

  arr.forEach(band => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="bands/${band.file}">${band.name}</a>`;
    list.appendChild(li);
  });
}

// リアルタイム検索
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const hira = toHiragana(value);

  if (value === "") {
    list.innerHTML = "";
    return;
  }

  const filtered = data.filter(band => {
    return (
      band.name.toLowerCase().includes(value) ||
      (band.kana && band.kana.includes(hira))
    );
  });

  displayBands(filtered);
});



const toggle = document.getElementById("themeToggle");

// 保存されてたら適用
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});