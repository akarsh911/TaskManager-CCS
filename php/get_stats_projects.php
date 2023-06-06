<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");

$arr = json_decode(json_encode(get_all_user_projects($_GET["id"])));
$retrn = array();

if ($arr != null) {
    for ($i = 0; $i < count($arr); $i++) {
        $ret = json_decode(get_project_by_id($arr[$i]->project_id));
        $projectName = $ret->project_name;
        $arr2 = array();
        $arr2 = json_decode(json_encode(get_user_contributions_by_user_id($_GET["id"])));
        if ($arr2 != null)
            for ($i2 = 0; $i2 < count($arr2); $i2++) {
                if ($arr2[$i2]->project_id == $arr[$i]->project_id)
                    if (!isset($retrn[$projectName])) {
                        $retrn[$projectName] = 1; // Initialize count to 1 if project name not found in $retrn
                    } else {
                        $retrn[$projectName]++; // Increment count if project name already exists in $retrn
                    }
            }


    }
}

$output = array();

foreach ($retrn as $name => $count) {
    $projectData = array(
        'name' => $name,
        'contributions' => $count
    );
    $output[] = $projectData;
}

echo json_encode($output);