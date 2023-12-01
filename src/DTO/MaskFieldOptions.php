<?php

namespace Insitaction\EasyAdminFieldsBundle\DTO;

final class MaskFieldOptions
{
    public const SELECT_MERGE = 'merge';
    public const SELECT_INTERSECT = 'intersect';

    private string $multipleSelectMode = self::SELECT_MERGE;
    /**
     * @var array<{value: string, fields: array<string>}>
     */
    private array $map;

    public function serialize(): array
    {
        return [
            'map' => $this->getMap(),
            'multipleSelectMode' => $this->getMultipleSelectMode(),
        ];
    }

    public static function new(): self
    {
        return new self();
    }

    public function addMap(string $value, array $fields): self
    {
        $this->map[] = [
            'value' => $value,
            'fields' => $fields
        ];

        return $this;
    }

    /**
     * @return array<{value: string, fields: array<string>}>
     */
    public function getMap(): array
    {
        return $this->map;
    }

    public function setMultipleSelectMode(string $multipleSelectMode): self
    {
        $this->multipleSelectMode = $multipleSelectMode;

        return $this;
    }

    public function getMultipleSelectMode(): string
    {
        return $this->multipleSelectMode;
    }
}
