<?php

namespace App\Helpers;

class UtilsHelper
{
    /**
     * @param int $user_id User-id
     *
     * @return string
     */
    public static function stringToSecret(string $string = NULL)
    {
        if (!$string) {
            return NULL;
        }
        $length = strlen($string);
        $visibleCount = (int) round($length / 4);
        $hiddenCount = $length - ($visibleCount * 2);
        return substr($string, 0, $visibleCount) . str_repeat('*', $hiddenCount) . substr($string, ($visibleCount * -1), $visibleCount);
    }

    public static function stringToCensor(string $string = "", $char = "*"){
        return str_repeat($char, strlen($string));
    }
}
