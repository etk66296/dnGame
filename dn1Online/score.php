<?php
// SAME PROBLEM: https://stackoverflow.com/questions/18866571/receive-json-post-with-php
$receivedScore = json_decode(file_get_contents('php://input'), true);
$existingScoreFile = fopen("score.json", "r") or die("Unable to open file!");
$existingScore = json_decode(fread($existingScoreFile, filesize("score.json")), true);
fclose($existingScoreFile);

$existingScore["score"] = array_slice($existingScore["score"], 0, 99);
// put the received score into the existing score
array_push($existingScore["score"], $receivedScore);

// bubble sort the score array by points
$swapped = false;
do {
  $swapped = false;
  for ($rank = 0; $rank < sizeof($existingScore["score"]) - 1 ; $rank++) {
    if ($existingScore["score"][$rank]["points"] < $existingScore["score"][$rank + 1]["points"]) {
      $temp = $existingScore["score"][$rank];
      $existingScore["score"][$rank] = $existingScore["score"][$rank + 1];
      $existingScore["score"][$rank + 1] = $temp;
      $swapped = true;
    }
  }
} while ($swapped);

// only allow 100 rank rows
if (sizeof($existingScore["score"] > 100)) {
  for ($rank = 100; $rank < sizeof($existingScore["score"]) ; $rank++) {
    array_pop($existingScore["score"]);
  }
}

$playersRank = -1;
// find the players score index
for ($rank = 0; $rank < sizeof($existingScore["score"]) ; $rank++) {
  if($existingScore["score"][$rank]["points"] === $receivedScore["points"] &&
  $existingScore["score"][$rank]["name"] === $receivedScore["name"]) {
    $playersRank = $rank + 1;
    // break the loop
    $rank = sizeof($existingScore["score"]) + 1;
  }
}

// save the new score
$newScoreFile = fopen("score.json", "w") or die("Unable to open file!");
// overwrite the score file
fwrite($newScoreFile, json_encode($existingScore));
fclose($newScoreFile);

// push the usr score and return it to client
$existingScore['current'] =  $receivedScore;
$existingScore['current']['rank'] =  $playersRank;
echo json_encode($existingScore)
?>
