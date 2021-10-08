<?php

namespace Insitaction\EasyAdminFieldsBundle\Enum;

class EnumPublishable extends AbstractEnum
{
    public const DRAFT = 'DRAFT';
    public const ARCHIVED = 'ARCHIVED';
    public const PUBLISHED = 'PUBLISHED';
    public const PROGRAMMED = 'PROGRAMMED';

    protected static array $choices = [
        self::DRAFT => 'status.draft',
        self::ARCHIVED => 'status.archived',
        self::PUBLISHED => 'status.published',
        self::PROGRAMMED => 'status.programmed',
    ];
}