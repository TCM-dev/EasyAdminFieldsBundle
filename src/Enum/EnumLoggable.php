<?php

namespace Insitaction\EasyAdminFieldsBundle\Enum;

class EnumLoggable extends AbstractEnum
{
    public const ERROR = 'ERROR';
    public const SUCCESS = 'SUCCESS';
    public const DEBUG = 'DEBUG';
    public const INFO = 'INFO';
    public const WARNING = 'WARNING';

    protected static array $choices = [
        self::ERROR => 'log.error',
        self::SUCCESS => 'log.success',
        self::DEBUG => 'log.debug',
        self::INFO => 'log.info',
        self::WARNING => 'log.warning',
    ];
}