<?php

namespace Insitaction\EasyAdminFieldsBundle\Enum;

abstract class AbstractEnum
{
    protected static array $choices = [];

    public static function getChoices(): array
    {
        return \array_flip(static::$choices);
    }
}